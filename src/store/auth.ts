import {atom} from 'jotai';
import { atomWithStorage } from 'jotai/utils';

/* 1. 실제 토큰 저장용 – localStorage('accessToken')와 동기화 */
export const accessTokenAtom = atomWithStorage<string | null > ('accessToken', null);
// 2. 자동 로그아웃
export const tokenExpireAtAtom = atomWithStorage<number | null >('tokenExpireAt', null); // 타임스탬프(ms)
// 3. 롤저장
export const roleAtom = atomWithStorage<'ROLE_GUEST' | 'ROLE_MEMBER'| 'ROLE_MANAGER' >('role', 'ROLE_GUEST');   //SSR 환경에서는 localStorage 접근이 서버에서는 안 되므로, useEffect 내부에서 읽는 게 안전

/* 3. 파생 아톰 – 토큰 존재 여부만 true/false로 */
// export const isLoggedInAtom = atom((get)=>!!get(accessTokenAtom));
export const isLoggedInAtom = atom((get) => {
        const token = get(accessTokenAtom);
        const expireAt = get(tokenExpireAtAtom);

        if (!token || !expireAt) return false;
        return Date.now() < expireAt; // 만료시간이 지나지 않았을 때만 true
    });
