import RGBA from "../entities/RGBA";
import Point2D from "../entities/Point2D";
import { BaseTool } from "./Tool";
import { ToolType } from "./ToolType";
import { putPixel, drawLinePoints } from "../utils/graphic";

export default class Pen extends BaseTool {

  public readonly type = ToolType.PEN;
  public readonly cursorCss: string = 'crosshair';
  private lastPoint: Point2D;
  private paintStart: boolean;
  private color: RGBA;

  private preview: HTMLCanvasElement | undefined;

  constructor() {
    super();

    this.lastPoint = Point2D.create(0,0);
    this.paintStart = false;
    this.color = RGBA.create(0,0,0);

    this.addColorProperty('color', RGBA.create(0,0,0));
  }

  private putPoints(points: Point2D[], context: CanvasRenderingContext2D) {
    points.forEach(point => {
      putPixel(point.x, point.y, context, this.color);
    });
  }

  public onPointerDown(point: Point2D, context: CanvasRenderingContext2D): void {
    this.paintStart = true;
    this.lastPoint = point;
    this.color = this.getProperty('color')?.value as RGBA;
    putPixel(Math.floor(point.x), Math.floor(point.y), context, this.color);
  }

  public onPointerUp(point: Point2D, context: CanvasRenderingContext2D): void {
    this.paintStart = false;
    this.lastPoint = point;
  }

  public onPointerMove(point: Point2D, context: CanvasRenderingContext2D): void {
    if (!this.paintStart) return;

    const last = this.lastPoint;

    if (Math.abs(point.x-last.x) > 1 || Math.abs(point.y-last.y) > 1) {
      const linePoints = drawLinePoints(last.x, last.y, point.x, point.y);
      this.putPoints(linePoints, context);
    } else {
      putPixel(Math.floor(point.x), Math.floor(point.y), context, this.color);
    }

    this.lastPoint = point;
  }

  public getPreview(point: Point2D, context: CanvasRenderingContext2D): HTMLCanvasElement {
    if (!this.preview) {
      this.preview = document.createElement("canvas");
      this.preview.width = 1;
      this.preview.height = 1;
      const ctx = this.preview.getContext('2d') as CanvasRenderingContext2D;
      this.color = this.getProperty('color')?.value as RGBA;
      ctx.fillStyle = this.color.rgbaCss;
      ctx.fillRect(0, 0, 1, 1);
    }

    return this.preview;
  }
}
