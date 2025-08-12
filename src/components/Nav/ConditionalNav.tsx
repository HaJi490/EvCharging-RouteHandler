'use client'

import React from 'react'
import { useAtom } from 'jotai';
import { usePathname } from 'next/navigation';
import Nav from './Nav'; // 기존 Nav 컴포넌트 경로
import { roleAtom } from '@/store/auth';


export default function ConditionalNav() {
    const [role] = useAtom(roleAtom);
    const pathname = usePathname();

    // 현재 경로가 /admin으로 시작하고, 유저의 롤이 ROLE_MANAGER일 경우
    const isAdminPage = pathname.startsWith('/admin') && role === 'ROLE_MANAGER';

    if(isAdminPage) {
        return null;
    }
    return <Nav/>;
}
