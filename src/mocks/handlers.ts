import { http, HttpResponse } from 'msw'
import * as statService from './services/stationService';
import * as userService from './services/userService';
import * as reservService from './services/reservationService';

const BACK_IP = process.env.NEXT_PUBLIC_BACKIP || '';

// 충전소 관련 API
const statHandler = [

]

//사용자 및 차량 관련 API
const userHandlers = [

]

// 예약 관련 API
const reservHandler = [

]


// 합쳐서 export
export const handlers = [
    ...userHandlers,
    ...statHandler,
    ...reservHandler
]

// // 기존 백엔드 서버 주소
// const BACK_IP = process.env.NEXT_PUBLIC_BACKIP;

// // 여기에 가로채고 싶은 API 요청들의 규칙을 배열로 정의합니다.
// export const handlers = [
//     // 로그인
//     http.post(`${BACK_IP}/login`, async ({ request }) => {
//         // 요청 본문(body)에서 email, password를 받을 수 있습니다.
//         const { email } = await request.json();

//         // 간단한 로그인 성공 시나리오
//         return HttpResponse.json({
//             userId: 'testuser',
//             email: email,
//             name: '테스트유저',
//             token: 'fake-jwt-token-for-testing',
//         })
//     }),

//     /**
//      * 예시 2: 회원정보 가져오기 API 모킹
//      * GET /user/info 요청을 가로채서, 하드코딩된 회원 정보를 반환합니다.
//      */
//     http.get(`${BACK_IP}/user/info`, () => {
//         return HttpResponse.json({
//             email: 'testuser@example.com',
//             name: '테스트유저',
//             carInfo: {
//                 brand: '현대',
//                 model: '아이오닉 5',
//             }
//         })
//     }),

//     // 앞으로 만들 모든 가짜 API 규칙들을 이 배열 안에 추가하면 됩니다.
//     // http.post(`${BACK_IP}/pred/location`, ...),
// ]