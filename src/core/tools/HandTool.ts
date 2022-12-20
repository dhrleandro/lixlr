import Point from "../entities/Point";
import { BaseTool } from "./Tool";
import { ToolType } from "./Type";

export default class HandTool extends BaseTool {

  public readonly type = ToolType.HAND;
  public readonly cursorCss: string = 'grabbing';

  constructor(context: CanvasRenderingContext2D) {
    super(context);
  }

  public onPointerDown(point: Point): void {}
  public onPointerUp(point: Point): void {}
  public onPointerMove(point: Point): void {}
}
