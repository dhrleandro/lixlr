import Point from "../entities/Point";
import { BaseTool } from "./Tool";

export default class HandTool extends BaseTool {

  public readonly cursorCss: string = 'grabbing';

  constructor(context: CanvasRenderingContext2D) {
    super(context);
  }

  public onPointerDown(point: Point): void {}
  public onPointerUp(point: Point): void {}
  public onPointerMove(point: Point): void {}
}
