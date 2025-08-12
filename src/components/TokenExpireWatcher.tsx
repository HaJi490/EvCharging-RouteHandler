'use client'

import { useEffect } from 'react'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { accessTokenAtom, tokenExpireAtAtom } from '@/store/auth'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
    exp: number;
}

export default function TokenExpireWatcher() {
    const [token, setToken] = useAtom(accessTokenAtom)
    const [expireAt, setExpireAt] = useAtom(tokenExpireAtAtom)
    const route = useRouter();

    // 마운트시에도 체크
    useEffect(() => {
    if (expireAt && Date.now() > expireAt) {
        setToken(null);
        setExpireAt(null);
        route.push('/login?toast=자동 로그아웃 되었습니다.');
    }
    }, []);

    // 1. 자동로그아웃 타이머
    useEffect(() => {
        const checkToken = () => {
            if (expireAt && Date.now() > expireAt) {
                setToken(null)
                setExpireAt(null)
                route.push('/login?toast=자동 로그아웃 되었습니다.');
            }
        }

        checkToken();
        const timer = setInterval(checkToken, 60000) ;// 1분마다 검사

        return () => clearInterval(timer);
    }, [expireAt])

//     useEffect의 세상 (React의 세상):
// useEffect 안의 코드는 컴포넌트가 렌더링될 때 실행됩니다.
// 의존성 배열은 **"어떤 값이 바뀌었을 때 이 useEffect 코드를 다시 실행할지"**를 React에게 알려주는 규칙서입니다.
// setInterval의 세상 (브라우저의 세상):
// setInterval(함수, 시간)은 useEffect가 실행되는 그 순간, 브라우저에게 "이 함수를 앞으로 시간 간격마다 계속 실행해줘!" 라고 단 한 번 예약하는 것과 같습니다.
// 일단 예약이 완료되면, 그 타이머는 React의 렌더링 주기나 의존성 배열과는 전혀 상관없이 독립적으로 동작합니다.

    // 2. 유저활동 감지 -> 만료시간 연장
    // useEffect(() => {
    //     if(!token) return;

    //     const extendExpireTime = () => {
    //     if (expireAt) {
    //         const newExpireAt = Date.now() + 2 * 60 * 60 * 1000;
    //         setExpireAt(newExpireAt)
    //     }
    //     }

    //     const events = ['click', 'keydown', 'scroll', 'mousemove'];
    //     events.forEach(event =>
    //     window.addEventListener(event, extendExpireTime)
    //     );

    //     return () => {
    //     events.forEach(event =>
    //         window.removeEventListener(event, extendExpireTime)
    //     );
    //     };
    // }, [expireAt])


    return null // 이 컴포넌트는 UI에 아무것도 안 보여줌
}