import React from 'react'
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
 * 1. 필터 조건에 맞는 충전소 목록 반환(지도표시용)
 * @param filters 
 * @returns 지도 표시에 필요한 최소정보만 담은 목록(StationSimpleDto) 
 */

export const getFilteredStations = (filters: any): StationSimpleDto[] => {
    // 상위 20개만 리턴 - FIXME 거리계산 추가
    return allStatData.slice(0, 20).map(stat => ({
        statId: stat.statId,
        statNm: stat.statNm,
        lat: stat.lat,
        lng: stat.lng,
        chargeNum: stat.chargeNum,
    }))
}
/**
 * 2. 최저경로, 최소시간 추천
 * @param filters
 * @returns StationShortestDto[]
 */

export const getShortestStation = (filters: any): StationShortestDto[] => {
    return allStatData.slice(0, 2).map(stat => ({
        ...(stat as StationDetailDto), // 원본 데이터를 StationDetailDto로 형변환
        minute: Math.floor(Math.random() * 20) + 5, //5-24분 랜덤 소요시간
        distance: Math.random() * 5, // 0~5km랜덤 거리
    }));
};

/**
 * 3. n시간 후 예측
 * @param minutes 총소요시간
 * @returns 
 */
const getPredTagFromMinutes = (minute: number): PredTag => {
    if (minute <= 10) return 'QUICK';
    if (minute <= 30) return 'NORMAL';
    if (minute <= 60) return 'SLOW';
    return 'CROWDED';
};

/**
 * @param filters
 * @returns StationRecommendDto[]
 */

export const getRecommendedStations = (filters: any): StationRecommendDto[] => {
    return allStatData.slice(0, 10).map(stat => {
        const minute = Math.floor(Math.random() * MAX_WAIT_TIME) + MIN_WAIT_TIME;
        const predTag = getPredTagFromMinutes(minute);

        return {
            ...stat,
            minute,
            distance: Math.random() * 8,
            predTag,
        }
    })
}

export default function stationService() {

}
