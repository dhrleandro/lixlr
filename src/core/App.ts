import CanvasView from "./CanvasView";
import Point2D from "./entities/Point2D";
import Rect2D from "./entities/Rect2D";
import PixelEditor from "./PixelEditor";
import StateManager from "./state/StateManager";
import { createInitialAppState, State } from "./state/State";

export default class App extends StateManager {

  private appView: CanvasView;

  constructor(containerReference: HTMLDivElement, appState: State) {
    super(appState);

    this.appView = new CanvasView(containerReference, this);

    const child = new PixelEditor(Point2D.create(0, 0), Rect2D.create(200, 200));
    this.appView.setChild(child);
  }

  public mountEvents() {
    this.appView.mountEvents();
  }

  public unmountEvents() {
    this.appView.unmountEvents();
  }

  public static create(containerReference: HTMLDivElement, appState?: State): App {
    if (!appState)
      appState = createInitialAppState();

    return new App(containerReference, appState);
  }
}
