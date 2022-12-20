import RGBA from "../entities/RGBA";
import Point2D from "../entities/Point2D";
import { BaseTool } from "./Tool";
import { ToolType } from "./ToolType";

export default class Brush extends BaseTool {

  public readonly type = ToolType.BRUSH;
  public readonly cursorCss: string = 'crosshair';
  private lastPoint: Point2D;
  private paintStart: boolean;
  private color: RGBA;
  private size: number = 10;

  constructor() {
    super();

    this.lastPoint = Point2D.create(0,0);
    this.paintStart = false;

    this.color = RGBA.create(0,0,0);

    this.addColorProperty('color', RGBA.create(0,0,0));
    this.addNumberProperty('size', 10);
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
