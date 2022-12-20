import ColorRgb from "../entities/ColorRgb";
import Point from "../entities/Point";
import { BaseTool } from "./Tool";
import { ToolType } from "./Type";
import { putPixel, drawLine } from "../utils/graphic";

export default class PenTool extends BaseTool {

  public readonly type = ToolType.PEN;
  private static readonly SIZE: number = 1;
  private lastPoint: Point;
  private paintStart: boolean;
  private color: ColorRgb;

  constructor(context: CanvasRenderingContext2D) {
    super(context);

    this.lastPoint = Point.create(0,0);
    this.paintStart = false;
    this.color = ColorRgb.create(0,0,0);

    this.addColorProperty('color', ColorRgb.create(0,0,0));
  }

  private putPoints(points: Point[]) {
    points.forEach(point => {
      putPixel(point.x, point.y, this.context, this.color);
    });
  }

  public onPointerDown(point: Point): void {
    this.paintStart = true;
    this.lastPoint = point;
    this.color = this.getProperty('color')?.value as ColorRgb;
    putPixel(Math.floor(point.x), Math.floor(point.y), this.context, this.color);
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
      putPixel(Math.floor(point.x), Math.floor(point.y), this.context, this.color);
    }

    this.lastPoint = point;
  }
}
