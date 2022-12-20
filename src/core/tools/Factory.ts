import BrushTool from "./BrushTool";
import HandTool from "./HandTool";
import PenTool from "./PenTool";
import { Tool } from "./Tool";
import { ToolType } from "./Type";

export class Factory {
  public static createPen(context: CanvasRenderingContext2D): PenTool {
    return new PenTool(context);
  }

  public static createBrush(context: CanvasRenderingContext2D): BrushTool {
    return new BrushTool(context);
  }

  public static createHand(context: CanvasRenderingContext2D): HandTool {
    return new HandTool(context);
  }
}

export const createTool = (type: ToolType, context: CanvasRenderingContext2D): Tool | undefined => {

  let tool: (Tool | undefined) = undefined;

  switch (type) {
    case ToolType.PEN:
      tool = Factory.createPen(context);
      break;

    case ToolType.BRUSH:
      tool = Factory.createBrush(context);
      break;

    default:
      tool = Factory.createHand(context);
      break;
  }

  return tool;
}
