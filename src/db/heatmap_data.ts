import {HeatmapFeatureCollection} from '../types/geojson'

export const heatmapData: HeatmapFeatureCollection = {
    type: 'FeatureCollection', // 여러 개의 지리적 모양(Feature)을 담는 컬렉션
    features: [
      // 각 점(Point)이 하나의 Feature 입니다.
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [126.9780, 37.5665] }, // [경도, 위도]
        properties: { intensity: 0.8 } // 히트맵 강도(가중치)로 사용할 값
      },
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [126.9785, 37.5670] },
        properties: { intensity: 1.0 }
      },
      {
        type: 'Feature',
        geometry: { type: 'Point', coordinates: [127.0276, 37.4979] }, // 강남역 근처
        properties: { intensity: 0.5 }
      },
      // ... 수백, 수천 개의 데이터 포인트들
    ]
  };
//   type: 'FeatureCollection',
//   features: [
//     {
//       type: 'Feature',
//       geometry: { type: 'Point', coordinates: [126.978, 37.5665] },
//       properties: {
//         stationId: 's1',
//         name: '서울시청 충전소',
//         inUse: 2,
//         available: 3,
//         broken: 1,
//       },
//     },
//     {
//       type: 'Feature',
//       geometry: { type: 'Point', coordinates: [127.0276, 37.4979] },
//       properties: {
//         stationId: 's2',
//         name: '강남역 충전소',
//         inUse: 4,
//         available: 1,
//         broken: 0,
//       },
//     },
//     {
//       type: 'Feature',
//       geometry: { type: 'Point', coordinates: [127.0017, 37.5704] },
//       properties: {
//         stationId: 's3',
//         name: '동대문 충전소',
//         inUse: 1,
//         available: 5,
//         broken: 0,
//       },
//     },
//     {
//       type: 'Feature',
//       geometry: { type: 'Point', coordinates: [126.9239, 37.5502] },
//       properties: {
//         stationId: 's4',
//         name: '홍대입구 충전소',
//         inUse: 3,
//         available: 2,
//         broken: 1,
//       },
//     },
//     {
//       type: 'Feature',
//       geometry: { type: 'Point', coordinates: [127.1054, 37.5162] },
//       properties: {
//         stationId: 's5',
//         name: '잠실역 충전소',
//         inUse: 5,
//         available: 0,
//         broken: 2,
//       },
//     },
//     {
//       type: 'Feature',
//       geometry: { type: 'Point', coordinates: [127.0631, 37.5109] },
//       properties: {
//         stationId: 's6',
//         name: '삼성동 충전소',
//         inUse: 2,
//         available: 2,
//         broken: 0,
//       },
//     },
//     {
//       type: 'Feature',
//       geometry: { type: 'Point', coordinates: [126.9527, 37.4981] },
//       properties: {
//         stationId: 's7',
//         name: '신림 충전소',
//         inUse: 1,
//         available: 4,
//         broken: 1,
//       },
//     },
//     {
//       type: 'Feature',
//       geometry: { type: 'Point', coordinates: [127.0305, 37.5971] },
//       properties: {
//         stationId: 's8',
//         name: '성북동 충전소',
//         inUse: 0,
//         available: 6,
//         broken: 0,
//       },
//     },
//     {
//       type: 'Feature',
//       geometry: { type: 'Point', coordinates: [126.9816, 37.5796] },
//       properties: {
//         stationId: 's9',
//         name: '경복궁 충전소',
//         inUse: 3,
//         available: 1,
//         broken: 0,
//       },
//     },
//     {
//       type: 'Feature',
//       geometry: { type: 'Point', coordinates: [127.1465, 37.5621] },
//       properties: {
//         stationId: 's10',
//         name: '강동구청 충전소',
//         inUse: 2,
//         available: 3,
//         broken: 1,
//       },
//     },
//   ],
// };
