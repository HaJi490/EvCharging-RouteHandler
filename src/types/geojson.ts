export type Position = [number, number];


// --- 2. 다양한 지오메트리(모양) 타입 정의 ---

/**
 * 점 (Point) 지오메트리
 */
export interface Point {
  type: 'Point';
  coordinates: Position;
}

/**
 * 선 (LineString) 지오메트리
 */
export interface LineString {
  type: 'LineString';
  coordinates: Position[];
}

/**
 * 면 (Polygon) 지오메트리
 */
export interface Polygon {
  type: 'Polygon';
  // 첫 번째 배열은 외부 링, 나머지는 내부 링(구멍)을 나타냅니다.
  coordinates: Position[][];
}

// 모든 지오메트리 타입을 하나로 묶습니다.
export type Geometry = Point | LineString | Polygon;


// --- 3. 최종적으로 사용될 Feature 및 FeatureCollection 타입 ---

/**
 * 하나의 지리적 모양과 그 속성(properties)을 담는 Feature 객체입니다.
 * P는 properties 객체의 타입을 의미하는 제네릭(Generic)입니다.
 */
export interface Feature<G extends Geometry | null, P = {}> {
  type: 'Feature';
  geometry: G; // 지오메트리 정보 (모양)
  properties: P; // 해당 모양과 관련된 데이터 (속성)
}

/**
 * 여러 개의 Feature를 담는 최상위 컬렉션 객체입니다.
 */
export interface FeatureCollection<G extends Geometry | null, P = {}> {
  type: 'FeatureCollection';
  features: Feature<G, P>[];
}


// --- 4. 사용자 케이스에 맞는 히트맵 전용 타입 (가장 중요!) ---

/**
 * 히트맵 데이터의 properties가 가질 타입입니다.
 */
export interface HeatmapProperties {
  intensity: number;
  // stationId: string;
  // name: string;
  // inUse: number;
  // available: number;
  // broken: number;
}

/**
 * 최종적으로 사용할 '히트맵용 GeoJSON 데이터'의 완전한 타입입니다.
 * Point 모양의 Geometry와 HeatmapProperties 속성을 가진 Feature들의 컬렉션입니다.
 */
export type HeatmapFeatureCollection = FeatureCollection<Point, HeatmapProperties>;