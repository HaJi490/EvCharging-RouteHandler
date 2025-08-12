'use client'
import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import style from './DelayStageBarChart.module.css'



// 1. 5단계 지연시간 데이터 (샘플)
const delayData = [
{ stage: '5', count: 45 },
{ stage: '4', count: 80 },
{ stage: '3', count: 120 },
{ stage: '2', count: 75 },
{ stage: '1', count: 30 },
];

// 2. 둥근 모서리를 가진 막대 컴포넌트
const RoundedBar = (props: any) => {
    const {x, y, width, height, fill} = props;
    const radius = 12; // 둥근모서리 반지름

    return(
        <g>
            <rect x={x} y={y}
            width={width} height={height}
            fill={fill} rx={radius} ry={radius} />
        </g>
    )
};

// 3. 호버 시 보여줄 커스텀 툴팁
const CustomTooltip = ({active, payload, label} : any) =>{
    if(active && payload && payload.length){
        return(
            <div className={style.custom_barchart_tooltip} 
                // style={{ transform: 'translateY(-10px)' }} //바보다 조금위로
            >
                <p className={style.tooltip_value}>{`${payload[0].value} 대`}</p>
                {/* 점을 툴팁안에 넣어 디자인 흉내 */}
                {/* <div className={style.tooltip_dot}></div> */}
            </div>
        );
    }
    return null;
}

export default function DelayStageBarChart() {
  return (
    <div className='w-full h-[300px]'>
        <ResponsiveContainer>
            <BarChart data={delayData} margin={{ top: 40, right: 20, left: 20, bottom: 5 }}>
                {/* 5. 그라데이션 정의 */}
                <defs>
                    <linearGradient id='barGradient' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='0%' stopColor='#8884d8' stopOpacity={1}/>
                        <stop offset='100%' stopColor='#8884d8' stopOpacity={0.01}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey='stage'
                        axisLine={false} // x축 선 제거
                        tickLine={false}
                        tick={{fill: '#888888'}} fontSize={12}
                />
                {/* 6. 커스텀 툴팁, 커서 설정 */}
                <Tooltip content={<CustomTooltip/>}
                        cursor={{ fill: 'transparent'}} // 툴팁 호버시 배경색이 변하는거 비활성화
                        // position={{y:-10}}        
                />
                {/* 7. 실제 막대를 그리는 Bar 컴포넌트 */}
                <Bar dataKey='count'
                    fill='url(#barGradient)'     // 위에서 정의한 그라데이션 id
                    shape={<RoundedBar/>}        // 둥근 모서리 막대컴포넌트
                    // 활성화된 막대모양 동일하게
                    activeBar={<RoundedBar/>}  
                />
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}
