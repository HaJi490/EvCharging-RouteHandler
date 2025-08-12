import React from 'react'
import { DayPicker } from 'react-day-picker';

import 'react-day-picker/dist/style.css'; // 기본 구조를 위한 필수 CSS
import './my-calendar-styles.css';      // 우리가 덮어쓸 커스텀 CSS

interface CustomDayPickerProps {
    selectedDate: Date | undefined;
    onSelectDate: (date: Date | undefined) => void;
    handleTimeslots?: (date: Date) => void; // 콜백함수
    disabledBefore?: boolean; 
}


export default function Calender({ 
    selectedDate, 
    onSelectDate, 
    handleTimeslots, 
    disabledBefore = true, 
}: CustomDayPickerProps) {
    const today = new Date();   // 이전날짜 선택안되도록
    today.setHours(0, 0, 0, 0);

    return (
        <DayPicker 
            mode='single' 
            selected={selectedDate} 
            disabled={disabledBefore ? { before: today } : undefined} 
            classNames={{
                selected: 'my-selected', // 선택된 날에 적용될 클래스
                today: 'my-today',       // 오늘 날짜에 적용될 클래스
                outside: 'my-outside',   // 다른 달의 날짜에 적용될 클래스
            }}
            onSelect={(date) => {
                if (date) {
                    onSelectDate(date);
                    // if (date >= today) {
                        handleTimeslots(date);
                    // }
                } else {
                    onSelectDate(undefined);
                }
            }} />
    )
}
