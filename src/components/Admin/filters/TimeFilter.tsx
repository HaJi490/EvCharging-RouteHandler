import React, { useState } from 'react'
// import style from './TimeFilter.module.css'

interface TimeSelectorProps {
    value: number;
    onTimeSelect: (time: number) => void; // time을 선택했을 때 실행될 콜백 함수
    showLabel? : boolean;
    min?: number;
    max?: number;
}

export default function TimeFilter({value, onTimeSelect, 
                                    showLabel = true, // 기본값 설정
                                    min = 0, 
                                    max = 24}:TimeSelectorProps ) {
    const [selectTime, setSelectTime] = useState<number>(value);
    

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectTime(parseInt(event.target.value, 10)); // 10진수로 해석
    };
    
    // 조작을 멈췄을때 부모에 값 전달
    const handleMouseUp = () => {
        onTimeSelect(selectTime);
    }

    return (
        <div className="flex flex-col w-full max-w-sm">
            {showLabel &&
                <label htmlFor="hour-slider" className="mb-2 font-semibold">
                    선택된 시간: {value}시간 후
                </label>
            }
            <div className="relative h-6 flex items-center">
                {/* 전체 트랙 (회색) */}
                <div className="absolute w-full h-1 bg-gray-300 rounded-full" />
                {/* 선택된 범위 트랙 (초록색) */}
                <div 
                    className="absolute h-1 bg-[#4FA969] rounded-full"
                    style={{ width: `${(selectTime / max) * 100}%` }} // 너비를 동적으로 조절
                />

                <input
                    id="hour-slider"
                    type="range"
                    min={min}
                    max={max }
                    step={1}
                    value={selectTime}
                    onChange={handleChange}
                    onMouseUp={handleMouseUp}
                    className={`handleChg`}
                    style={{ zIndex: 2 }}
                />
            </div>
            <div className="flex justify-between text-xs mt-1">
                <span>0:00</span>
                <span>{max/2}:00</span>
                <span>{max}:00</span>
            </div>
        </div>
    )
}
