'use client'    // 브라우저있을때만 렌더링

import React, { useEffect } from 'react'

export default function MSWComponent() {
    useEffect(() => {
        // window 객체가 존재할때만 MSW 실행(서버사이드 렌더링 에러 방지) -- 서버에서 미리 html을 만들어둠(ssr) -> 브라우저의 네트워크 기능을 조작해야하니 window가 꼭 있어야함
        if(typeof window !== 'undefined'){ 
            const { worker } = require('/browser'); //worker: msw 기능
            worker.start({
                onUnhandledRequest: 'bypass', //처리되지 않은 요청은 실제 네트워크로 보내도록 설정
            })
        }
    }, [])

    return null;
}
