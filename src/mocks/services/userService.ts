import React from 'react'
import { usersDB } from '../data/usersDB'

// 로그인
export const login = (loginData: any) => {
    const user = usersDB.find(
        u => u.email === loginData.email && u.password === loginData.password
    );

    if(user){
        sessionStorage.setItem('userId', user.username);    // FIXME 아톰으로 구현
        // 비밀번호를 제외하고 반환
        const {password, ...userInfo} = user;
        return userInfo;
    }

    return null;
}

export default function userService() {
 
}
