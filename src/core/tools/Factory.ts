// import BrushTool from "./BrushTool";
// import EraserTool from "./EraserTool";
import Hand from "./Hand";
import Pen from "./Pen";
import { Tool } from "./Tool";
import { ToolType } from "./ToolType";

export default class Factory {
  private static createPen(): Pen {
    return new Pen();
  }

  // private static createBrush(): BrushTool {
  //   return new BrushTool(context);
  // }

  // private static createEraser(): EraserTool {
  //   return new EraserTool(context);
  // }

  private static createHand(): Hand {
    return new Hand();
  }

  public static createTool(type: ToolType | undefined): Tool | undefined {
    let tool: (Tool | undefined) = undefined;

    switch (type) {
      case ToolType.PEN:
        tool = Factory.createPen();
        break;

      case ToolType.HAND:
        tool = Factory.createHand();
        break;

      // case ToolType.BRUSH:
      //   tool = Factory.createBrush();
      //   break;

      // case ToolType.ERASER:
      //   tool = Factory.createEraser();
      //   break;

      default:
        tool = undefined;
    }

    return tool;
  }

}
