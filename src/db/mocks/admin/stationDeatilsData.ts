//❗ 히트맵 데이터를 기반으로 더미데이터 생성
import stationList from './heatmapData.json';

// 타입을 미리 정의해두면 자동 완성이 편리합니다. (실제 프로젝트에 맞게 수정)
interface Station {
  statId: string;
  statNm: string;
  addr: string;
  [key: string]: any; // 나머지 필드
}

interface ChargerDetail {
  statId: string;
  chgerId: string;
  stat: "1" | "2" | "3"; // 충전기 상태 (1: 통신이상, 2: 충전가능, 3: 충전중 등)
  [key: string]: any; // 나머지 필드
}

// ✅ 2. 빠른 조회를 위해 원본 데이터를 Map 형태로 변환합니다. (최초 1회만 실행됨)
const stationMap = new Map<string, Station>(
  stationList.map(station => [station.statId, station])
);

/**
 * chargerInfo 객체를 동적으로 생성하는 함수
 * @param baseInfo - 원본 충전소 정보
 * @returns - 상세 정보에 포함될 chargerInfo 객체
 */
const generateChargerInfo = (baseInfo: Station): Record<string, ChargerDetail> => {
  const chargerCount = baseInfo.chargeNum || (Math.floor(Math.random() * 4) + 1); // 원본 데이터에 충전기 수가 없다면 1~5개 랜덤 생성
  const chargerInfo: Record<string, ChargerDetail> = {};

  for (let i = 1; i <= chargerCount; i++) {
    const chgerId = String(i).padStart(2, '0'); // "01", "02", ...
    chargerInfo[chgerId] = {
      // 기본 정보는 원본 데이터에서 가져옴
      ...baseInfo, 
      chgerId: chgerId,
      // 상세 정보에만 있는 필드들을 추가 (랜덤 또는 고정값)
      chgerType: "02", // AC완속
      stat: (Math.floor(Math.random() * 3) + 1).toString() as ChargerDetail['stat'], // 1~3 사이 랜덤 상태
      output: "7",
      limitYn: "Y",
      limitDetail: "거주자외 출입제한",
      // ... 기타 필요한 상세 필드들
    };
  }
  return chargerInfo;
};

// ✅ 3. MSW 핸들러에서 호출할 최종 함수
export const getStationDetailById = (statId: string) => {
  // Map에서 statId로 원본 데이터를 찾습니다.
  const baseInfo = stationMap.get(statId);

  // 원본 데이터가 없으면 null 반환
  if (!baseInfo) {
    return null;
  }

  // 원본 데이터와 동적으로 생성된 chargerInfo를 합쳐서 최종 응답 객체를 만듭니다.
  return {
    ...baseInfo,
    useTime: "24시간 이용가능", // 고정값이면 그대로 사용
    chargerInfo: generateChargerInfo(baseInfo),
    enabledCharger: ["AC완속"], // 필요에 따라 동적으로 생성 가능
  };
};