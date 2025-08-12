'use client';
import { useState, useEffect } from 'react';
import { HiArrowSmallUp } from "react-icons/hi2";

export default function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    // 1. 스크롤 위치를 감지하여 버튼의 보임/숨김 상태를 결정하는 함수
    const toggleVisibility = () => {
        // window.scrollY: 수직 스크롤 위치 (픽셀)
        // 200px 이상 스크롤되면 버튼을 보이게 함
        if (window.scrollY > 200) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };
    // 2. 페이지 최상단으로 부드럽게 스크롤하는 함수
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // 부드러운 스크롤 효과
        });
    };
    // 3. 컴포넌트가 마운트될 때 스크롤 이벤트 리스너를 추가하고,
    // 언마운트될 때 리스너를 제거합니다.
    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        // 컴포넌트가 사라질 때 이벤트 리스너를 정리합니다. (메모리 누수 방지)
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className={`fixed bottom-10 right-10
                        transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>

            <button
                type='button'
                onClick={scrollToTop}
                // isVisible 상태에 따라 버튼의 투명도와 위치를 조절하여 부드러운 등장/사라짐 효과
                className='p-3 rounded-full bg-[#232323] text-[#dadada] shadow-lg hover:bg-[#333] 
                        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#666]'
            >
                {/* <span className='p-2 border border-[#666] rounded-full'> */}
                    <HiArrowSmallUp size={28} />
                {/* </span> */}
            </button>
        </div>
    )
}
