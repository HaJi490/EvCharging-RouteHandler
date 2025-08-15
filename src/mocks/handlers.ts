import { http, HttpResponse } from 'msw'

// process.env.NEXT_PUBLIC_BACKIP 는 기존에 사용하시던 백엔드 서버 주소입니다.
const BACK_IP = process.env.NEXT_PUBLIC_BACKIP;

// 여기에 가로채고 싶은 API 요청들의 규칙을 배열로 정의합니다.
export const handlers = [
    /**
     * 예시 1: 로그인 API 모킹
     * POST /login 요청을 가로채서, 성공 시 가짜 유저 정보와 토큰을 반환합니다.
     */
    http.post(`${BACK_IP}/login`, async ({ request }) => {
        // 요청 본문(body)에서 email, password를 받을 수 있습니다.
        const { email } = await request.json();

        // 간단한 로그인 성공 시나리오
        return HttpResponse.json({
            userId: 'testuser',
            email: email,
            name: '테스트유저',
            token: 'fake-jwt-token-for-testing',
        })
    }),

    /**
     * 예시 2: 회원정보 가져오기 API 모킹
     * GET /user/info 요청을 가로채서, 하드코딩된 회원 정보를 반환합니다.
     */
    http.get(`${BACK_IP}/user/info`, () => {
        return HttpResponse.json({
            email: 'testuser@example.com',
            name: '테스트유저',
            carInfo: {
                brand: '현대',
                model: '아이오닉 5',
            }
        })
    }),

    // 앞으로 만들 모든 가짜 API 규칙들을 이 배열 안에 추가하면 됩니다.
    // http.post(`${BACK_IP}/pred/location`, ...),
]