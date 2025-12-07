import {
    StationSimpleDto,
    StationDetailDto,
    StationShortestDto,
    StationRecommendDto
} from '../../types/station';
import { ChargingStationResponseDto } from '@/types/dto';
import rawData from '../data/statsDB.json';

const allStatData = rawData as ChargingStationResponseDto[]; // *타입표시를 통해 배열구조임을 알려줌

type PredTag = 'QUICK' | 'NORMAL' | 'SLOW' | 'CROWDED';
const MIN_WAIT_TIME = 5;  // 최소 대기/이동 시간 5분
const MAX_WAIT_TIME = 90; // 최대 대기/이동 시간 90분

/**
 * 거리 계산함수(Haversine 공식)
 * @param lat1 사용자 위도 
 * @param lng1 사용자 경도
 * @param lat2 충전소 위도
 * @param lng2 충전소 경도
 * @returns 거리(km)
 */

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number
) {
    const R = 6371; // 지구반지름
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c
}


/**
 * 1. 필터 조건에 맞는 충전소 목록 반환
 * @param filters 
 * @returns 지도표시용 간단한 충전소 목록(StationSimpleDto) 
 */

export const getFilteredStations = (filters: any): StationSimpleDto[] => { //FIXME ChargingStationResponseDto[]로 변경
    const { coordinatesDto, mapQueryDto } = filters;
    const { lat, lng, radius } = coordinatesDto;

    let filtered = allStatData

    // 1) 반경 필터링
    if (lat && lng && radius) {
        filtered = filtered.filter(stat => {
            const distance = calculateDistance(lat, lng, stat.lat, stat.lng);
            return distance * 1000 <= radius; //km를 m로 변환
        })
    }

    // 2) 사용가능 여부 필터링
    if (mapQueryDto?.canUse) {
        filtered = filtered.filter(stat => stat.chargeNum > 0);
    }

    // 3) 무료주차 필터링
    if (mapQueryDto?.parkingFree) {
        filtered = filtered.filter(stat => stat.parkingFree === true);
    }

    // 4) 이용제한 필터링
    if (mapQueryDto?.limitYn) {
        filtered = filtered.filter(stat => stat.limitYn === false);
    }

    // 5) 충전기 타입 필터링
    if (mapQueryDto?.chgerType && mapQueryDto.chgerType.length > 0) {
        filtered = filtered.filter(stat =>
            mapQueryDto.chgerType.some((type: string) => stat.enabledCharger?.includes(type))
        );
    }

    // 6) 사업자 ID 필터링
    if (mapQueryDto?.busiId && mapQueryDto.busiId.length > 0) {
        filtered = filtered.filter(stat =>
            mapQueryDto.busiId.includes(stat.busiId)
        );
    }

    // 7) kW 범위 필터링
    if (mapQueryDto?.outputMin || mapQueryDto?.outputMax) {
        filtered = filtered.filter(stat => {
            const outputs = stat.enabledCharger?.map(Number) || [];
            const maxOutput = Math.max(...outputs);

            return (
                (!mapQueryDto.outputMin || maxOutput >= mapQueryDto.outputMin) &&
                (!mapQueryDto.outputMax || maxOutput <= mapQueryDto.outputMin)
            )
        })
    }

    // 8) 키워드 검색 (충전소명, 주소)
    if (mapQueryDto?.keyWord) {
        const keyword = mapQueryDto.keyWord.toLowerCase();
        filtered = filtered.filter(stat =>
            stat.statNm.toLowerCase().includes(keyword) ||
            stat.addr.toLowerCase().includes(keyword)
        );
    }

    // 거리순 정렬 후 상위 50개 반환
    if (lat && lng) {
        filtered = filtered
            .map(stat => ({
                ...stat,
                distance: calculateDistance(lat, lng, stat.lat, stat.lng)
            }))
            .sort((a, b) => a.distance - b.distance)
            .slice(0, 50)
    }

    return filtered
}
/**
 * 2. 최단거리, 최소시간 2곳 추천
 * @param filters
 * @returns StationShortestDto[]
 */

export const getShortestStation = (filters: any): StationShortestDto[] => {
    const {coordinatesDto} = filters;
    const {lat, lon} = coordinatesDto;

    // 필터링된 목록 가져오기
    const filtered = getFilteredStations(filters);

    // 거리순 정렬 후 상위 2개
    const shortest = filtered.map(stat => {
        const distance = calculateDistance(lat, lon, stat.lat, stat.lng);
        // 거리(km) -> 시간(분) 변환 (평균속도 30km/h 가정)
        const minute = Math.round((distance / 30 ) * 60 + Math.floor(Math.random() * 5))

        return {
            ...(stat as StationDetailDto),
            minute,
            distance
        }
    }).sort((a, b) => a.distance - b.distance).slice(0, 2);

    return shortest;
};

/**
 * 3. 예측태그 생성
 * @param minutes 총소요시간
 * @returns StationRecommendDto (QUICK/NORMAL/SLOW/CROWDED)
 */
const getPredTagFromMinutes = (minute: number): PredTag => {
    if (minute <= 10) return 'QUICK';
    if (minute <= 30) return 'NORMAL';
    if (minute <= 60) return 'SLOW';
    return 'CROWDED';
};

/**
 * 4. n시간 후 추천 충전소(예측)
 * @param filters
 * @returns 예측정보가 추가된 충전소 목록
 */

export const getRecommendedStations = (filters: any): StationRecommendDto[] => {
    const {coordinatesDto, time} = filters;
    const {lat, lon} = coordinatesDto; 
    
    // **시간대별 혼잡도 시뮬레이션
    // 필터링된 목록 가져오기
    const filtered = getFilteredStations(filters);

    // 예측시간 파싱
    const predictionTime = new Date(time);
    const hour = predictionTime.getHours();

    // 시간대별 혼잡도 가중치 (출퇴근 시간 고려)
    let congestionWeight = 1.0;
    if (hour >= 7 && hour <= 9) congestionWeight = 1.5 // 출근시간
    if (hour >= 12 && hour <= 13) congestionWeight = 1.2 // 점심시간
    if (hour >= 18 && hour <= 20) congestionWeight = 1.3 // 퇴근시간

    return filtered
        .slice(0, 10)
        .map(stat => {
            const distance = calculateDistance(lat, lon, stat.lat, stat.lng)
        
            // 기본 이동시간 계산
            const baseMinute = Math.round((distance / 30) * 60);

            // 혼잡도에 따른 대기시간 추가
            const waitTime = Math.floor(Math.random() * 20 * congestionWeight);
            const minute = Math.max(baseMinute + waitTime, MIN_WAIT_TIME);

            const predTag = getPredTagFromMinutes(minute);

            return {
                ...stat,
                minute,
                distance: Number(distance.toFixed(2)),
                predTag
            }
        }).sort((a, b)=> a.minute - b.minute) // 시간순 정렬
    
}

export default function stationService() {

}
