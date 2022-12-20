import ColorRgba from "../entities/ColorRgba";
import Point from "../entities/Point";
import { BaseTool } from "./Tool";
import { ToolType } from "./Type";
import { removePixel, drawLine } from "../utils/graphic";

export default class EraserTool extends BaseTool {

  public readonly type = ToolType.ERASER;
  public readonly cursorCss: string = 'crosshair';
  private static readonly SIZE: number = 1;
  private lastPoint: Point;
  private paintStart: boolean;

  constructor(context: CanvasRenderingContext2D) {
    super(context);

    this.lastPoint = Point.create(0,0);
    this.paintStart = false;
  }

  private putPoints(points: Point[]) {
    points.forEach(point => {
      removePixel(point.x, point.y, this.context);
    });
  }

  public onPointerDown(point: Point): void {
    this.paintStart = true;
    this.lastPoint = point;
    removePixel(Math.floor(point.x), Math.floor(point.y), this.context);
  }

  public onPointerUp(point: Point): void {
    this.paintStart = false;
    this.lastPoint = point;
  }

  public onPointerMove(point: Point): void {
    if (!this.paintStart) return;

    const last = this.lastPoint;

    if (Math.abs(point.x-last.x) > 1 || Math.abs(point.y-last.y) > 1) {
      const linePoints = drawLine(last.x, last.y, point.x, point.y);
      this.putPoints(linePoints);
    } else {
      removePixel(Math.floor(point.x), Math.floor(point.y), this.context);
    }

    this.lastPoint = point;
  }
}