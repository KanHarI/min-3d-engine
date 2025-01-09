import { Point, PolyObject } from "@/engine/PolyObject";
import { expm, matrix, Matrix, multiply, subtract } from "mathjs";
import { ProjectedPolyObject } from "@/engine/ProjectedPolyObject";

export class Camera {
  private _position: Point;
  private _rotation: { x: number; y: number; z: number };
  private _focalLength: number;

  constructor(args: {
    position: Point;
    rotation: { x: number; y: number; z: number };
    focalLength: number;
  }) {
    this._position = args.position;
    this._rotation = args.rotation;
    this._focalLength = args.focalLength;
  }

  public get position(): Point {
    return this._position;
  }

  public get rotation(): { x: number; y: number; z: number } {
    return this._rotation;
  }

  public get rotationMatrix(): Matrix {
    const logRotationMatrix = matrix([
      [0, this._rotation.z, -this._rotation.y],
      [-this._rotation.z, 0, this._rotation.x],
      [this._rotation.y, -this._rotation.x, 0],
    ]);
    return expm(logRotationMatrix);
  }

  public project(polyObject: PolyObject): ProjectedPolyObject {
    const relativePolyObject: PolyObject = {
      points: polyObject.points.map((point) => {
        const relPos = subtract(point, this._position);
        return multiply(this.rotationMatrix, relPos).toArray() as Point;
      }),
      edges: polyObject.edges,
    };
    return {
      points: relativePolyObject.points.map((point) => ({
        x: (point[0] * this._focalLength) / point[2],
        y: (point[1] * this._focalLength) / point[2],
        orthigonalDistance: point[2],
      })),
      edges: relativePolyObject.edges,
    };
  }
}
