import { http, HttpResponse } from 'msw'
import * as statService from './services/stationService';
import * as userService from './services/userService';
import * as reservService from './services/reservationService';

const BACK_IP = `http://${process.env.NEXT_PUBLIC_BACKIP}:8080`;

console.log('🔧 MSW BASE_URL:', BACK_IP);

// 충전소 관련 API
const statHandler = [
    // 1. 충전소 정보 가져오기
    http.post(`${BACK_IP}/map/post/stations`, async({request}) => {
        console.log('hadlers1_ 충전소 정보 요청받음')

        const filters = await request.json();
        console.log('hadlers1_요청필터:', filters)

        const stats = statService.getFilteredStations(filters);
        console.log(`hadlers1_응답: ${stats.length}개 충전소`)
        // await new Promise(resolve => setTimeout(resolve, 500));  // 실제처럼 딜레이 주고싶으면
        return HttpResponse.json(stats);
    }),

    // 2. 최단거리/최소시간 조회
    http.post(`${BACK_IP}/map/get/near`, async({request}) => {
        console.log('hadlers2_ 최단거리 충전소 정보 요청받음')
        
        const filters = await request.json();
        const stats = statService.getShortestStation(filters); // FIXME 1에서 가져온 충전소 정보에서 가져와야함

        return HttpResponse.json(stats);
    }),

    // 3. n시간 후 예측/추천
    http.post(`${BACK_IP}/recommend/car`, async({request}) => {
        console.log('handlers3_ 추천 충전소 요청 받음')

        const filters = await request.json();
        const stats = statService.getRecommendedStations(filters);
        
        return HttpResponse.json(stats);
    })
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

// console.log('등록된 핸들러 수:', handlers.length)


