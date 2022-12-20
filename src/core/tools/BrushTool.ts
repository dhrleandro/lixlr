import ColorRgb from "../entities/ColorRgb";
import Point from "../entities/Point";
import { BaseTool } from "./Tool";
import { ToolType } from "./Type";

export default class BrushTool extends BaseTool {

  public readonly type = ToolType.BRUSH;
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

  public onPointerDown(point: Point): void {
    this.paintStart = true;
    this.lastPoint = point;
    this.color = this.getProperty('color')?.value as ColorRgb;
  }

  public onPointerUp(point: Point): void {
    this.paintStart = false;
    this.lastPoint = point;
  }

  public onPointerMove(point: Point): void {

    if (this.paintStart) {
      this.context.fillStyle = this.color.rgbCss;
      this.context.strokeStyle = this.color.rgbCss;
      this.context.lineWidth = 100;
      this.context.lineCap = 'round';
      this.context.beginPath();
      this.context.moveTo(this.lastPoint.x, this.lastPoint.y);
      this.context.lineTo(point.x, point.y);
      this.context.stroke();
    }

    this.lastPoint = point;
  }
}
