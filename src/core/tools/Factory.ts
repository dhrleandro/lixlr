// import BrushTool from "./BrushTool";
// import EraserTool from "./EraserTool";
import Hand from "./Hand";
import Pen from "./Pen";
import { Tool } from "./Tool";
import { ToolType } from "./ToolType";

export class Factory {
  public static createPen(context: CanvasRenderingContext2D): Pen {
    return new Pen(context);
  }

  // public static createBrush(context: CanvasRenderingContext2D): BrushTool {
  //   return new BrushTool(context);
  // }

  // public static createEraser(context: CanvasRenderingContext2D): EraserTool {
  //   return new EraserTool(context);
  // }

  public static createHand(context: CanvasRenderingContext2D): Hand {
    return new Hand(context);
  }
}

export const createTool = (type: ToolType, context: CanvasRenderingContext2D): Tool | undefined => {

  let tool: (Tool | undefined) = undefined;

  switch (type) {
    case ToolType.PEN:
      tool = Factory.createPen(context);
      break;

    // case ToolType.BRUSH:
    //   tool = Factory.createBrush(context);
    //   break;

    // case ToolType.ERASER:
    //   tool = Factory.createEraser(context);
    //   break;

    default:
      tool = Factory.createHand(context);
      break;
  }

  return tool;
}
