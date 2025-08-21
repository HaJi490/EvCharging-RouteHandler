export interface User {
    username: string;
    password?: string;
    gender: 'male' | 'female' | null;
    name: string;
    phoneNumber: string | null;
    email: string | null;
    postalCode: string | null;
    roadAddress: string | null;
    detailAddress: string | null;
    createdAt: string;
    role: 'MEMBER' | 'MANAGER' | 'ADMIN';
    enabled: boolean;
}

const COMMON_PASSWORD_HASH = '$2a$10$d.wPy.2o3o5k3.G.x.Y.z.e.F.G.H.I.J.K.L.M.N.O'; // qwer1234!

// userDB
export let usersDB: User[] = [
    {
        username: "testmem2",
        password: COMMON_PASSWORD_HASH,
        gender: "female",
        name: "김나은",
        phoneNumber: "010-8765-4321",
        email: "naeun.kim@example.com",
        postalCode: "07761",
        roadAddress: "서울 강서구 가로공원로 174-5",
        detailAddress: "204호",
        createdAt: "2025-08-21 15:56:55",
        role: "MEMBER",
        enabled: true,
    },
    {
        username: "manager",
        password: COMMON_PASSWORD_HASH,
        gender: "male",
        name: "박매니저",
        phoneNumber: "010-1111-2222",
        email: "manager.park@example.com",
        postalCode: null,
        roadAddress: null,
        detailAddress: null,
        createdAt: "2025-08-15 12:29:38",
        role: "MANAGER",
        enabled: true,
    },
    {
        username: "admin",
        password: COMMON_PASSWORD_HASH,
        gender: "male",
        name: "최고관리자",
        phoneNumber: "010-9999-8888",
        email: "admin.choi@example.com",
        postalCode: null,
        roadAddress: null,
        detailAddress: null,
        createdAt: "2025-08-15 12:29:38",
        role: "ADMIN",
        enabled: true,
    },
    {
        username: "member1",
        password: COMMON_PASSWORD_HASH,
        gender: "male",
        name: "이첫째",
        phoneNumber: "010-1234-5678",
        email: "first.lee@example.com",
        postalCode: null,
        roadAddress: null,
        detailAddress: null,
        createdAt: "2025-08-15 12:29:38",
        role: "MEMBER",
        enabled: true,
    },
    {
        username: "testmem1",
        password: COMMON_PASSWORD_HASH,
        gender: "female",
        name: "박하나",
        phoneNumber: "010-1111-1111",
        email: "hana.park@example.com",
        postalCode: "46729",
        roadAddress: "부산 강서구 가달1로 7",
        detailAddress: "1202호",
        createdAt: "2025-08-01 10:20:18",
        role: "MEMBER",
        enabled: true,
    },
    {
        username: "testmem",
        password: COMMON_PASSWORD_HASH,
        gender: "male",
        name: "홍길동",
        phoneNumber: "010-2222-3333",
        email: "gildong.hong@example.com",
        postalCode: "34672",
        roadAddress: "대전 동구 판교1길 3",
        detailAddress: "1402호",
        createdAt: "2025-08-01 10:16:30",
        role: "MEMBER",
        enabled: true,
    },
    {
        username: "cncn0069",
        password: COMMON_PASSWORD_HASH,
        gender: "male",
        name: "안순현",
        phoneNumber: "010-4094-1226",
        email: "sunhyun.ahn@example.com",
        postalCode: "46643",
        roadAddress: "부산 북구 시랑로94번길 97",
        detailAddress: "201동 1203호",
        createdAt: "2025-08-01 09:22:36",
        role: "MEMBER",
        enabled: true,
    },
    {
        username: "evvvv",
        password: COMMON_PASSWORD_HASH,
        gender: "female",
        name: "차수정",
        phoneNumber: "010-5555-4444",
        email: "sujeong.cha@example.com",
        postalCode: "46729",
        roadAddress: "부산 강서구 가달1로 7",
        detailAddress: "22호",
        createdAt: "2025-07-30 14:40:17",
        role: "MEMBER",
        enabled: true,
    },
];