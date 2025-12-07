'use client'    // 브라우저있을때만 렌더링

import React, { useEffect, useState } from 'react'
import LottieLoading from '@/components/LottieLoading';

export default function MSWComponent({children}: {children: React.ReactNode}) {
    const [mswReady, setMswReady] = useState(false);

    useEffect(() => {
        const init = async() => {
            // 브라우저 환경 체크
            // window 객체가 존재할때만 MSW 실행(서버사이드 렌더링 에러 방지) 
            // -- 서버에서 미리 html을 만들어둠(ssr) -> 브라우저의 네트워크 기능을 조작해야하니 window가 꼭 있어야함
            if(typeof window === 'undefined'){
                console.log('서버환경 x (MSW 건너뜀)')
                setMswReady(true);
                return;
            }
            
            if(process.env.NEXT_PUBLIC_USE_MSW === 'true'){ 
                try{
                    const { worker } = await import('./browser'); //worker: msw 기능
                    
                    await worker.start({
                        onUnhandledRequest: 'bypass', //모킹되지 않은 요청은 실제 네트워크로 보내도록 설정
                        serviceWorker: {
                            url: '/mockServiceWorker.js'
                        }
                    })
                    console.log('MSW 활성화 완료');
                    console.log('현재 등록된 핸들러 수:', worker.listHandlers().length)
                } catch (error) {
                    console.error('MSW 초기화 실패:', error);
                } finally {
                    setMswReady(true);
                }
            }
        }
        init();
    }, [])

    if(!mswReady){
        return <div className="w-full h-screen flex justify-center items-center bg-black/10"><LottieLoading /></div>
    }

    return <>{children}</>;
}
