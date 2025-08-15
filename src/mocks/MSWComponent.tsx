'use client'

import React, { useEffect } from 'react'

export default function MSWComponent() {
    useEffect(() => {
        // 개발 환경에서만 MSW를 활성화합니다.
        // if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
            // require를 사용하여 browser.ts를 동적으로 가져옵니다.
            const { worker } = require('./browser')

            // 서비스 워커를 시작합니다.
            worker.start()
        // }
    }, [])

    return null;
}
