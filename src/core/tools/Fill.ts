import RGBA from "../entities/RGBA";
import Point2D from "../entities/Point2D";
import { BaseTool } from "./Tool";
import { ToolType } from "./ToolType";
import floodFill from "../utils/floodfill";

export default class Fill extends BaseTool {

  public readonly type = ToolType.FILL;
  public readonly cursorCss: string = 'crosshair';
  private color: RGBA;

  constructor() {
    super();
    this.color = RGBA.create(0,0,0);
    this.addColorProperty('color', RGBA.create(0,0,0));
  }

  public onPointerDown(point: Point2D, context: CanvasRenderingContext2D): void {
    this.color = this.getProperty('color')?.value as RGBA;
    floodFill(context, point.x, point.y, this.color);
  }

  public onPointerUp(point: Point2D, context: CanvasRenderingContext2D): void {}

  public onPointerMove(point: Point2D, context: CanvasRenderingContext2D): void {}
}
