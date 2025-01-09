export interface projectedPoint {
  x: number;
  y: number;
  orthigonalDistance: number;
}

export interface ProjectedPolyObject {
  points: Array<projectedPoint>;
  edges: Array<[number, number]>; // indices of points
}

export function renderOnCanvas(
  ctx: CanvasRenderingContext2D,
  projectedPolyObject: ProjectedPolyObject,
  opts: {
    vertexSize: number;
    edgeSize: number;
    edgeOpacity: number;
  }
) {
  for (const vertex of projectedPolyObject.points) {
    const vertexSize = opts.vertexSize / vertex.orthigonalDistance;
    const canvasX = (vertex.x * 2 - 0.5) * ctx.canvas.width;
    const canvasY = (vertex.y * 2 - 0.5) * ctx.canvas.height;
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, vertexSize, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
  }
  for (const edge of projectedPolyObject.edges) {
    const p1 = projectedPolyObject.points[edge[0]];
    const p2 = projectedPolyObject.points[edge[1]];
    const canvasX1 = (p1.x * 2 - 0.5) * ctx.canvas.width;
    const canvasY1 = (p1.y * 2 - 0.5) * ctx.canvas.height;
    const s1 = opts.edgeSize / p1.orthigonalDistance;
    const canvasX2 = (p2.x * 2 - 0.5) * ctx.canvas.width;
    const canvasY2 = (p2.y * 2 - 0.5) * ctx.canvas.height;
    const s2 = opts.edgeSize / p2.orthigonalDistance;
    // Trapezoid edge
    const dx = canvasX2 - canvasX1;
    const dy = canvasY2 - canvasY1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const offsetX = (dy / length) * 0.5;
    const offsetY = (-dx / length) * 0.5;
    const corners = [
      { x: canvasX1 - offsetX * s1, y: canvasY1 - offsetY * s1 },
      { x: canvasX1 + offsetX * s1, y: canvasY1 + offsetY * s1 },
      { x: canvasX2 + offsetX * s2, y: canvasY2 + offsetY * s2 },
      { x: canvasX2 - offsetX * s2, y: canvasY2 - offsetY * s2 },
    ];
    ctx.beginPath();
    ctx.moveTo(corners[0].x, corners[0].y);
    ctx.lineTo(corners[1].x, corners[1].y);
    ctx.lineTo(corners[2].x, corners[2].y);
    ctx.lineTo(corners[3].x, corners[3].y);
    ctx.closePath();
    ctx.fillStyle = `rgba(255, 255, 255, ${opts.edgeOpacity})`;
    ctx.fill();
  }
}
