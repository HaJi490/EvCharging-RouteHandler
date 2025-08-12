// 📍전기차충전소 요청dto
export interface CoordinatesDto {
    lat: number;
    lon: number;
    radius: number;
}

export interface MapQueryDto {
    useMap: boolean;
    limitYn: boolean;
    parkingFree: boolean;
    canUse: boolean;
    outputMin: number;
    outputMax: number;
    busiId: string[];     // 사업자 ID 리스트
    chgerType: string[];  // 충전기 타입 리스트
    keyWord?: string;
}

export interface ChargingStationRequestDto {
    coorDinatesDto: CoordinatesDto;
    mapQueryDto: MapQueryDto;
}

// n시간후 전기차충전소 요청dto
export interface ChargingStationPredictionRequestDto {
    coorDinatesDto: CoordinatesDto;
    mapQueryDto: MapQueryDto;
    time: Date;
}

// 전기차충전소 응답dto
export interface ChargerInfoItem {
    statNm: string;
    statId: string;
    chgerId: string;
    chgerType: string;
    addr: string;
    lat: number;
    lng: number;
    useTime: string;
    location: string | null;
    startUpdatetime: string | null;
    stat: string;
    statUpdDt: string;
    lastTsdt: string;
    lastTedt: string;
    nowTsdt: string;
    output: string;
    method: string;
    kind: string;
    kindDetail: string;
    parkingFree: string;
    note: string;
    limitYn: string;
    limitDetail: string;
    delYn: string;
    busiId: string;
    busiNm: string;
    // minuteEv: number;
}

export interface ChargerInfoMap {
    [chgerId: string]: ChargerInfoItem;
}

// 충전소 공통정보
export interface BaseChargingStationDto {
    statNm: string;
    statId: string;
    addr: string;
    lat: number;
    lng: number;
    parkingFree: boolean;
    limitYn: boolean;
    totalChargeNum: number;
    totalFastNum: number;
    totalSlowNum: number;
    chargeFastNum: number;
    chargeSlowNum: number;
    totalMidNum: number;
    chargeMidNum: number;
    chargeNum: number;
    enabledCharger: string[];
    busiId: string;
    busiNm: string;
    chargerInfo: Record<string, ChargerInfoItem>; //ChargerInfoMap;
    useTime: string;

    minute: number;
    predTag: string | null; // 혹은 다른 타입일 수 있습니다.
    bestChoice: any | null; // 실제 타입에 맞게 수정하세요.
    leastDis: number | null;   // 실제 타입에 맞게 수정하세요.
    leashTime: number | null;  // 실제 타입에 맞게 수정하세요.
    canLongUse: any | null; // 실제 타입에 맞게 수정하세요.

    // 👇 예측 DTO에 있던
    totalNacsNum: number;
    chargingDemand: number;
}

// (Member) 현재 충전소 응답 DTO
export interface ChargingStationResponseDto extends BaseChargingStationDto {
    // 추가되는 속성이 없으므로 비워둡니다.
}

// // (Member) N시간 후 예측 충전소 응답 DTO
export interface ChargingStationPredictionResponseDto extends BaseChargingStationDto {
    // 예측 DTO에만 있는 속성만 여기에 추가합니다.
    // totalNacsNum: number;
    // chargingDemand: number;
}
// // (Member) 리스트 패널의 아이템을 위한 새로운 타입을 선언합니다.
export interface StationListItem extends ChargingStationResponseDto {
    // changeStatus: 'increase' | 'decrease' | 'same' | 'none';
    isRecommended?: boolean,
    predTag: string;
    minute: number; // 소요시간
}

// (Member) 예측응답 dto ver.2
export interface RecommendedStationDto extends BaseChargingStationDto {
    minute: number;
    predTag: string;
    bestChoice: string | null;
    totalNacsNum: number;
    chargingDemand: number;
}


// (Manager) 대시보드 히트맵 응답
export interface ActualChargingStationData {
    statNm: string;
    statId: string;
    addr: string;
    // useTime은 문자열일 수도, null일 수도 있습니다.
    useTime: string | null;
    lat: number;
    lng: number;
    parkingFree: boolean;
    limitYn: boolean;
    totalChargeNum: number;
    totalFastNum: number;
    totalSlowNum: number;
    chargeFastNum: number;
    chargeSlowNum: number;
    totalMidNum: number;
    chargeMidNum: number;
    // 새로 추가된 필드
    totalNacsNum: number;
    // 새로 추가된 필드
    chargingDemand: number;
    chargeNum: number;
    // enabledCharger는 문자열 배열이거나 null일 수 있습니다.
    enabledCharger: string[] | null;
    busiId: string;
    busiNm: string;
    // chargerInfo는 객체이거나 null일 수 있습니다.
    // ChargerInfoItem 타입을 모르므로 우선 'any'로 지정하고,
    // 나중에 정확한 타입으로 교체하는 것을 권장합니다.
    chargerInfo: Record<string, any> | null;
}

// (Manager) 대시보드 실시간상태 응답
export interface ChargerTotalStatusData {
    totalCharger: number;
    totalUseableCharger: number;
    totalDisableCharger: number;
    stat: number[]; // [1~5, 9] 상태 순서대로 개수
};

// 충전소별 시게열응답
export type WeekdayDemand = {
    stationLocation: string;
    dayOfWeek:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
    kwhRequest: number;
};

// (관리자) 멤버관리
export interface User {
    username: string;
    nickname: string;
    password: string; // 비밀번호는 보통 응답 값에 포함되지 않으므로 optional(?)로 처리하는 것이 안전할 수 있습니다.
    phoneNumber: string;
    email: string;
    sex: string;
    zipcode: string;
    roadAddr: string;
    detailAddr: string;
    enabled: boolean;
    createAt: string; // ISO 8601 형식의 날짜는 string으로 받는 것이 일반적입니다.
}

// 📍회원가입 reqest
export interface SignupRequest {
    username: string;
    nickname: string;
    password: string;
    phoneNumber: string;
    email: string;
    sex: 'male' | 'female' | undefined;
    zipcode?: string; // 선택 입력이므로 optional로 처리
    roadAddr?: string; // 선택 입력이므로 optional로 처리
    detailAddr?: string; // 선택 입력이므로 optional로 처리
    createAt: string | Date; // Date 객체일 수도 있고, ISO 문자열일 수도 있음
}


// 예약현황 request
export interface ReservationStatusRequestDto {
    statId: string;
    date: string;      // 예: "2025-07-06"
    chgerId: string;
}

// 예약현황 response
export interface TimeInfo {
    statId: string;
    chgerId: string;
    timeId: number;
    date: string;         // 예: "2025-07-06"
    startTime: string;    // 예: "00:00:00"
    endTime: string;      // 예: "00:29:59"
    enabled: boolean;
}

// 충전스케줄링 - 예약정보
// chargerId 타입
interface ChargerId {
    statId: string;
    chgerId: string;
}

// storeInfo 타입
interface StoreInfo {
    statId: string;
    statNm: string;
    addr: string;
    lat: number;
    lng: number;
    parkingFree: boolean;
    limitYn: boolean;
    enabledCharger: string[];
    busiId: string;
    busiNm: string;
    chargerNm: number | null;
}

// charger 타입
export interface Charger {
    chargerId: ChargerId;
    chgerType: string;
    output: number;
    storeInfo: StoreInfo;
}

// slot 타입
export interface Slot {
    timeId: number;
    charger: Charger;
    date: string; // 충전하는 날짜
    startTime: string;
    endTime: string;
    enabled: boolean;
}

// 예약데이터
export interface Reservation {
    reserveId: number;
    username: string;
    slot: Slot[];
    reserveDate: string;  // 내가 예약한 날짜
    updateDate: string;
    reseverState: '예약완료' | '예약취소';
}

// getMyReservation의 전체 응답 타입
export interface MyReservationDto {
    [date: string]: Reservation[];
}

// 마이페이지 - 회원정보
export interface User {
    username: string;
    nickname: string;
    password: string; // 응답 값에 보통 비밀번호는 제외되므로 optional 처리
    phoneNumber: string;
    email: string;
    sex: string | null; // null 값이 올 수 있음
    zipcode: string | null;
    role: string[]; // 문자열 배열
    roadAddr: string | null;
    detailAddr: string | null;
    enabled: boolean;
    createAt: string; // ISO 형식 날짜는 string으로 받음
}

/**
 * 정렬 관련 정보입니다.
 */
// export interface SortInfo {
//   empty: boolean;
//   sorted: boolean;
//   unsorted: boolean;
// }

// /**
//  * 페이지네이션 세부 정보입니다.
//  */
// export interface Pageable {
//   pageNumber: number;
//   pageSize: number;
//   sort: SortInfo;
//   offset: number;
//   paged: boolean;
//   unpaged: boolean;
// }

// /**
//  * 페이지네이션이 적용된 API 응답의 전체 구조입니다.
//  * 제네릭 타입 <T>를 사용하여 어떤 종류의 데이터 목록이든 담을 수 있습니다.
//  * (예: Page<User>, Page<Post>, Page<Product>)
//  */
// export interface UserInfoList<T> {
//   content: T[];
//   pageable: Pageable;
//   last: boolean;
//   totalElements: number;
//   totalPages: number;
//   size: number;
//   number: number; // 현재 페이지 번호 (0부터 시작)
//   sort: SortInfo;
//   first: boolean;
//   numberOfElements: number;
//   empty: boolean;
// }

// 마이페이지 - 차량정보
export interface Cars {
    brand: string;
    userCarId: number;
    model: string;
    mainModel: boolean;
}

// 마이페이지 - 충전히스토리
// 충전히스토리 타입 선언
export interface ChargingHistoryItem {
    statNm: string;            // 충전소 이름
    chgerId: string;           // 충전기 ID
    chargeDate: string;        // 충전 날짜 (YYYY.MM.DD)
    chargeSTime: string;       // 충전 시작 시간 (HH:mm)
    chargeETime: string;       // 충전 완료 시간 (HH:mm)
    chargeAmount: number;      // 충전량 (kWh)
    chargeCost: number;        // 충전 금액
    chargeDuration: number;    // 충전 시간 (분)
    isReserved: boolean;       // 예약 여부
    reservedSTime: string;     // 예약 시작 시간 (HH:mm)
    reservedETime: string;     // 예약 완료 시간 (HH:mm)
    chgerType: string;         // 충전기 종류
    busiNm: string;            // 사업자명
    // 결제수단, 충전기위치 등 추가 가능
};

export interface History {
    monthlyChargeCount: number;           // 월 충전 횟수
    monthlyChargeAmount: number;          // 월 충전량 (kWh)
    monthlyChargeCost: number;            // 월 충전 금액
    chargingHistory: ChargingHistoryItem[]; // 충전 내역 리스트
};

// 📍(manager) 회원정보
/**
 * HATEOAS 응답의 _links 객체에 포함된 링크 정보입니다.
 */
export interface Link {
    href: string;
}
export interface Links {
    self: Link;
    first?: Link;
    prev?: Link;
    next?: Link;
    last?: Link;
}

/**
 * HATEOAS 응답의 페이지 정보입니다.
 */
export interface PageInfo {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number; // 현재 페이지 번호 (0-indexed)
}

/**
 * HATEOAS 페이지네이션 API 응답의 전체 구조입니다.
 * 제네릭 <T>를 사용하여 어떤 데이터 목록이든 담을 수 있습니다.
 */
export interface HateoasPageResponse<T> {
  _embedded: {
    [key: string]: T[]; 
  };
  _links: Links;
  page: PageInfo;
}

// 멤버 페이지
export interface User {
  username: string;
  nickname: string;
  password: string | null;
  phoneNumber: string;
  email: string;
  sex: string | null;
  zipcode: string | null;
  role: string[];
  roadAddr: string | null;
  detailAddr: string | null;
  enabled: boolean;
  createAt: string;
}

// 문의게시글 페이지
export interface InquiryBoard {
  id: number;
  title: string;
  content: string;
  memberUsername: string;
  createdAt: string | null; // null이 올 수 있으므로 | null 을 추가하는 것이 중요!
  updatedAt: string;
  enabled: boolean;
}


