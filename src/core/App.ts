import CanvasView from "./CanvasView";
import Point2D from "./entities/Point2D";
import Rect2D from "./entities/Rect2D";
import PixelEditor from "./PixelEditor";
import StateManager from "./state/StateManager";
import { createInitialAppState, State } from "./state/State";
import { ActionType, makeAction } from "./state/Store";

export default class App extends StateManager {

  private appView: CanvasView;

  constructor(containerReference: HTMLDivElement, appState: State) {
    super(appState);

    this.appView = new CanvasView(containerReference, this);

    // create PixelEditor centered
    const containerReact = containerReference.getBoundingClientRect();
    const size = Rect2D.create(300,300);
    const centerX = containerReact.width / 2;
    const centerY = containerReact.height / 2;
    const position = Point2D.create(
      Math.floor(centerX - size.width/2),
      Math.floor(centerY - size.height/2)
    );
    const child = new PixelEditor(position, size);
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
