import CanvasView from "./CanvasView";
import Point2D from "./entities/Point2D";
import Rect2D from "./entities/Rect2D";
import PixelEditor from "./PixelEditor";

export default class App {

  private appView: CanvasView;

  constructor(containerReference: HTMLDivElement) {
    this.appView = new CanvasView(containerReference);

    const child = new PixelEditor(Point2D.create(0, 0), Rect2D.create(800, 800 ));
    this.appView.setChild(child);
  }

  public mountEvents() {
    this.appView.mountEvents();
  }

  public unmountEvents() {
    this.appView.unmountEvents();
  }
}
