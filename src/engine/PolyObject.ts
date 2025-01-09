export type Point = [number, number, number];

export interface PolyObject {
  points: Array<Point>;
  edges: Array<[number, number]>; // indices of points
}

export function createCube(): PolyObject {
  const points: Array<[number, number, number]> = [];
  // V000
  // V001
  // ...
  // V111
  for (let i = 0; i < 8; ++i) {
    points.push([i & 1 ? 1 : -1, i & 2 ? 1 : -1, i & 4 ? 1 : -1]);
  }
  const edges: Array<[number, number]> = [];
  // E00_
  // E01_
  // E10_
  // E11_
  // E0_0
  // E0_1
  // ...
  // E_11
  // Iterating over dimensions
  for (let i = 0; i < 3; ++i) {
    const edgesExponents = [0, 1, 2].filter((x) => x !== i);
    for (let j = 0; j < 2; ++j) {
      const addedD1 = (j ? 1 : 0) << edgesExponents[0];
      for (let k = 0; k < 2; ++k) {
        const addedD2 = (k ? 1 : 0) << edgesExponents[1];
        edges.push([
          addedD1 + addedD2,
          addedD1 + addedD2 + (1 << edgesExponents[0]),
        ]);
      }
    }
  }
  return { points, edges };
}
