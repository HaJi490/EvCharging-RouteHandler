import { http, HttpResponse } from 'msw'
import * as statService from './services/stationService';
import * as userService from './services/userService';
import * as reservService from './services/reservationService';

// const BACK_IP = `http://${process.env.NEXT_PUBLIC_BACKIP}:8080`;

// console.log('🔧 MSW BASE_URL:', BACK_IP);

// // 충전소 관련 API
// const statHandler = [
//     // 1. 충전소 정보 가져오기
//     http.post(`${BACK_IP}/map/post/stations`, async({request}) => {
//         console.log('hadlers1_ 충전소 정보 요청받음')

//         const filters = await request.json();
//         console.log('hadlers1_요청필터:', filters)

//         const stats = statService.getFilteredStations(filters);
//         console.log(`hadlers1_응답: ${stats.length}개 충전소`)
//         // await new Promise(resolve => setTimeout(resolve, 500));  // 실제처럼 딜레이 주고싶으면
//         return HttpResponse.json(stats);
//     }),

//     // 2. 최단거리/최소시간 조회
//     http.post(`${BACK_IP}/map/get/near`, async({request}) => {
//         console.log('hadlers2_ 최단거리 충전소 정보 요청받음')
        
//         const filters = await request.json();
//         const stats = statService.getShortestStation(filters); // FIXME 1에서 가져온 충전소 정보에서 가져와야함

//         return HttpResponse.json(stats);
//     }),

//     // 3. n시간 후 예측/추천
//     http.post(`${BACK_IP}/recommend/car`, async({request}) => {
//         console.log('handlers3_ 추천 충전소 요청 받음')

//         const filters = await request.json();
//         const stats = statService.getRecommendedStations(filters);
        
//         return HttpResponse.json(stats);
//     })
// ]

// //사용자 및 차량 관련 API
// const userHandlers = [

// ]

// // 예약 관련 API
// const reservHandler = [

// ]


// // 합쳐서 export
// export const handlers = [
//     ...userHandlers,
//     ...statHandler,
//     ...reservHandler
// ]

// console.log('등록된 핸들러 수:', handlers.length)

export const handlers = [
    // 1. 충전소 정보
    http.post('http://localhost:8080/map/post/stations', () => {
        console.log('🎯 handler 1: /map/post/stations')
        return HttpResponse.json([
            {
                statNm: "테스트 충전소",
                statId: "TEST001",
                addr: "부산광역시 동래구",
                lat: 35.2174588,
                lng: 129.0736804,
                parkingFree: true,
                limitYn: false,
                totalChargeNum: 1,
                totalFastNum: 1,
                totalSlowNum: 0,
                chargeFastNum: 1,
                chargeSlowNum: 0,
                totalMidNum: 0,
                chargeMidNum: 0,
                chargeNum: 1,
                enabledCharger: ["100"],
                busiId: "ME",
                busiNm: "환경부",
                useTime: "24시간 개방",
                leastDis: 0  // ← 추가
            }
        ])
    }),

    // 2. 최단거리
    http.post('http://localhost:8080/map/get/near', () => {
        console.log('🎯 handler 2: /map/get/near')
        return HttpResponse.json([
            {
                statNm: "가까운 충전소 1",
                statId: "NEAR001",
                addr: "부산광역시",
                lat: 35.22,
                lng: 129.08,
                parkingFree: true,
                limitYn: false,
                totalChargeNum: 2,
                totalFastNum: 2,
                totalSlowNum: 0,
                chargeFastNum: 2,
                chargeSlowNum: 0,
                totalMidNum: 0,
                chargeMidNum: 0,
                chargeNum: 2,
                enabledCharger: ["100"],
                busiId: "ME",
                busiNm: "환경부",
                useTime: "24시간",
                minute: 5,      // ← 추가
                distance: 1.2,  // ← 추가
                leastDis: 0     // ← 추가
            },
            {
                statNm: "가까운 충전소 2",
                statId: "NEAR002",
                addr: "부산광역시",
                lat: 35.23,
                lng: 129.09,
                parkingFree: true,
                limitYn: false,
                totalChargeNum: 1,
                totalFastNum: 1,
                totalSlowNum: 0,
                chargeFastNum: 1,
                chargeSlowNum: 0,
                totalMidNum: 0,
                chargeMidNum: 0,
                chargeNum: 1,
                enabledCharger: ["50"],
                busiId: "ME",
                busiNm: "환경부",
                useTime: "24시간",
                minute: 8,
                distance: 2.5,
                leastDis: 0
            }
        ])
    }),

    // 3. 추천
    http.post('http://localhost:8080/recommend/car', () => {
        console.log('🎯 handler 3: /recommend/car')
        return HttpResponse.json([])
    }),

    // 4. 장기충전
    http.post('http://localhost:8080/map/get/longUse', () => {
        console.log('🎯 handler 4: /map/get/longUse')
        return HttpResponse.json([])
    })
]

console.log('🔧 핸들러 수:', handlers.length)
