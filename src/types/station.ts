// 마커표시
export interface StationSimpleDto {
    statId: string;
    statNm: string;
    lat: number;
    lng: number;
    chargeNum: number; // 사용 가능한 충전기 수 (마커 색상 구분용)
}

// 충전소 목록, 상세정보
export interface StationDetailDto extends StationSimpleDto {
    addr: string;
    useTime: string;
    parkingFree: boolean;
    limitYn: boolean;
    busiNm: string;
    totalChargeNum: number;
    totalFastNum: number;
    totalSlowNum: number;
    chargeFastNum: number;
    chargeSlowNum: number;
    chargerInfo: Record<string, any> | null; // 실제 chargerInfo 타입은 더 상세하게 정의 가능
}

// 최단최소
export interface StationShortestDto extends StationSimpleDto {
    minute: number; // 소요 시간
    distance: number; // 거리
}

// 예측
export interface StationRecommendationDto extends StationShortestDto {
  predTag: string | null; // 예측 태그
}
