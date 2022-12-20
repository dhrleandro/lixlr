import RGBA from "../entities/RGBA";
import Point2D from "../entities/Point2D";
import { BaseTool } from "./Tool";
import { ToolType } from "./ToolType";
import floodFill from "../utils/floodfill";

export default class Fill extends BaseTool {

  public readonly type = ToolType.FILL;
  public readonly cursorCss: string = 'crosshair';
  private lastPoint: Point2D | undefined;
  private color: RGBA;

  constructor() {
    super();

    this.lastPoint = Point2D.create(0,0);
    this.color = RGBA.create(0,0,0);

    this.addColorProperty('color', RGBA.create(0,0,0));
  }

  public onPointerDown(point: Point2D, context: CanvasRenderingContext2D): void {
    this.lastPoint = point;
    this.color = this.getProperty('color')?.value as RGBA;
  }

  public onPointerUp(point: Point2D, context: CanvasRenderingContext2D): void {
    if (this.lastPoint)
      floodFill(context, this.lastPoint.x, this.lastPoint.y, this.color);

    this.lastPoint = undefined;
  }

  public onPointerMove(point: Point2D, context: CanvasRenderingContext2D): void {}
}
