// 1. 하나의 예약이 가질 정보 (사용자 예약 기록 응답 형식과 유사하게)
export interface MyReservation {
  reserveId: number;
  username: string;
  statId: string;
  chgerId: string;
  slotIds: number[];
  reserveDate: string; // "YYYY-MM-DD"
  updateDate: string;
  reseverState: "예약완료" | "사용완료" | "예약취소";
}

// 2. '데이터베이스' 역할을 할 배열.
//    실제 사용자의 예약 기록만 여기에 저장되고 수정/삭제됩니다.
export let myReservationsDB: MyReservation[] = [
  // 테스트를 위한 초기 샘플 데이터
  {
    reserveId: 101,
    username: 'testuser', // 현재 로그인된 사용자와 일치
    statId: 'PW012020',
    chgerId: '05',
    slotIds: [1018, 1019, 1020, 1021], // 4개의 타임슬롯을 예약했음
    reserveDate: '2025-08-01',
    updateDate: '2025-08-01',
    reseverState: '예약완료',
  },
  {
    reserveId: 102,
    username: 'anotherUser', // 다른 사람의 예약
    statId: 'ST262309',
    chgerId: '01',
    slotIds: [357, 358], // 10:00, 10:30 슬롯을 예약했음
    reserveDate: '2025-08-15',
    updateDate: '2025-08-15',
    reseverState: '예약완료',
  },
];