'use client'    // 브라우저있을때만 렌더링

import React, { useEffect, useState } from 'react'
import LottieLoading from '@/components/LottieLoading';

let mswInitialized = false

export function isMSWReady() {
    return mswInitialized
}

export default function MSWComponent({ children }: { children: React.ReactNode }) {
    const [mswReady, setMswReady] = useState(false);

    useEffect(() => {
        const init = async () => {
            // 1. 서버환경 체크
            if (typeof window === 'undefined') {
                console.log('서버환경 x (MSW 건너뜀)')
                setMswReady(true);
                return;
            }

            // 2. MSW 사용여부 체크
            const useMSW = process.env.NEXT_PUBLIC_USE_MSW === 'true'
            console.log('USE_MSW: ', useMSW)

            if (!useMSW) {
                console.log('MSW 비활성화 - 실제 백엔드 사용')
                mswInitialized = true;
                setMswReady(true);
                return;
            }

            try {
                const { worker } = await import('./browser'); //worker: msw 기능
                console.log('worker 로드 완료')

                await worker.start({
                    onUnhandledRequest: 'warn', //모킹되지 않은 요청은 실제 네트워크로 보내도록 설정
                    serviceWorker: {
                        url: '/mockServiceWorker.js'
                    }
                })
                console.log('MSW 활성화 완료');
                console.log('현재 등록된 핸들러 수:', worker.listHandlers().length)
            
                mswInitialized = true;
            } catch (error) {
                console.error('MSW 초기화 실패:', error);
            } finally {
                setMswReady(true);
            }
        }
        init();
    }, [])

    if (!mswReady) {
        return <div className="w-full h-screen flex justify-center items-center bg-black/10"><LottieLoading /></div>
    }

    return <>{children}</>;
}
