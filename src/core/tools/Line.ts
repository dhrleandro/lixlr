import RGBA from "../entities/RGBA";
import Point2D from "../entities/Point2D";
import { BaseTool } from "./Tool";
import { ToolType } from "./ToolType";
import { putPixel, drawLinePoints } from "../utils/graphic";

export default class Line extends BaseTool {

  public readonly type = ToolType.LINE;
  public readonly cursorCss: string = 'crosshair';
  private lastPoint: Point2D;
  private paintStart: boolean;
  private color: RGBA;

  private canvasBackup: HTMLCanvasElement | undefined;
  private backupContext: CanvasRenderingContext2D | undefined;

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

    // copies the actually layer state
    this.canvasBackup = document.createElement("canvas");
    this.canvasBackup.width = context.canvas.width;
    this.canvasBackup.height = context.canvas.height;
    this.backupContext = this.canvasBackup.getContext('2d') as CanvasRenderingContext2D;
    this.backupContext.putImageData(context.getImageData(
      0, 0,
      context.canvas.width, context.canvas.height
    ), 0, 0);

    this.paintStart = true;
    this.lastPoint = point;
    this.color = this.getProperty('color')?.value as RGBA;
    putPixel(Math.floor(point.x), Math.floor(point.y), context, this.color);
  }

  public onPointerMove(point: Point2D, context: CanvasRenderingContext2D): void {
    if (!this.paintStart) return;

    if (this.canvasBackup) {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height)
      context.drawImage(this.canvasBackup, 0, 0);
    }

    const last = this.lastPoint;
    const linePoints = drawLinePoints(last.x, last.y, point.x, point.y);
    this.putPoints(linePoints, context);
  }

  public onPointerUp(point: Point2D, context: CanvasRenderingContext2D): void {
    this.paintStart = false;
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
