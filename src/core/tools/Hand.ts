import Point from "../entities/Point2D";
import { BaseTool } from "./Tool";
import { ToolType } from "./ToolType";

export default class Hand extends BaseTool {

  public readonly type = ToolType.HAND;
  public readonly cursorCss: string = 'grabbing';

  constructor(context: CanvasRenderingContext2D) {
    super(context);
  }

  public onPointerDown(point: Point): void {}
  public onPointerUp(point: Point): void {}
  public onPointerMove(point: Point): void {}
}
