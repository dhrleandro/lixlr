import RGBA from "../entities/RGBA";
import Point2D from "../entities/Point2D";
import { BaseTool } from "./Tool";
import { ToolType } from "./ToolType";

export default class BrushEraser extends BaseTool {

  public readonly type = ToolType.ERASER;
  public readonly cursorCss: string = 'crosshair';
  private lastPoint: Point2D;
  private paintStart: boolean;
  private color: RGBA;
  private size: number = 10;

  constructor() {
    super();

    this.lastPoint = Point2D.create(0,0);
    this.paintStart = false;

    this.addNumberProperty('size', 10);

    // important
    const alpha = 0;
    const color = RGBA.create(0,0,0,alpha);
    this.addColorProperty('color', color);
    this.color = color;
  }

  public onPointerDown(point: Point2D, context: CanvasRenderingContext2D): void {
    this.paintStart = true;
    this.lastPoint = point;
    this.color = this.getProperty('color')?.value as RGBA;
    this.size = this.getProperty('size')?.value as number;
    context.save();
  }

  public onPointerMove(point: Point2D, context: CanvasRenderingContext2D): void {

    if (this.paintStart) {
      context.fillStyle = this.color.rgbaCss;
      context.strokeStyle = this.color.rgbaCss;
      context.lineWidth = this.size;
      context.lineCap = 'round';
      context.globalCompositeOperation="destination-out"; // Important
      context.beginPath();
      context.moveTo(this.lastPoint.x, this.lastPoint.y);
      context.lineTo(point.x, point.y);
      context.stroke();
    }

    this.lastPoint = point;
  }

  public onPointerUp(point: Point2D, context: CanvasRenderingContext2D): void {
    this.paintStart = false;
    this.lastPoint = point;
    context.restore();
  }
}
