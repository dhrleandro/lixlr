// import BrushTool from "./BrushTool";
// import EraserTool from "./EraserTool";
import Brush from "./Brush";
import BrushEraser from "./BrushEraser";
import Eraser from "./Eraser";
import Hand from "./Hand";
import Line from "./Line";
import Pen from "./Pen";
import Rectangle from "./Rectangle";
import { Tool } from "./Tool";
import { ToolType } from "./ToolType";

export default class Factory {
  private static createPen(): Pen {
    return new Pen();
  }

  private static createBrush(): Brush {
    return new Brush();
  }

  private static createEraser(): BrushEraser { // Eraser {
    // return new Eraser();
    return new BrushEraser();
  }

  private static createHand(): Hand {
    return new Hand();
  }

  private static createLine(): Line {
    return new Line();
  }

  private static createRectangle(): Rectangle {
    return new Rectangle();
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

      case ToolType.BRUSH:
        tool = Factory.createBrush();
        break;

      case ToolType.ERASER:
        tool = Factory.createEraser();
        break;

      case ToolType.LINE:
        tool = Factory.createLine();
        break;

      case ToolType.RECTANGLE:
        tool = Factory.createRectangle();
        break;

      default:
        tool = undefined;
    }

    return tool;
  }

}
