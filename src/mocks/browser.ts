import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// 핸들러들을 기반으로 서비스 워커를 설정합니다.
export const worker = setupWorker(...handlers);
console.log('browser.ts 로드됨');
console.log('받은 핸들러 수:', handlers.length)