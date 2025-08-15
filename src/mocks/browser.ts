import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// 3단계에서 만든 핸들러들을 기반으로 서비스 워커를 설정합니다.
export const worker = setupWorker(...handlers)