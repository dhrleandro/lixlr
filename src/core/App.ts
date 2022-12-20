import CanvasView from "./CanvasView";
import Point2D from "./entities/Point2D";
import Rect2D from "./entities/Rect2D";
import PixelEditor from "./PixelEditor";
import StateManager from "./state/StateManager";
import { State } from "./state/State";

export default class App {

  private stateManager: StateManager;
  private appView: CanvasView;

  constructor(containerReference: HTMLDivElement, stateManager: StateManager) {
    this.stateManager = stateManager;
    this.appView = new CanvasView(containerReference, this.stateManager);

    this.attachObservers();

    // create PixelEditor centered
    const size = this.stateManager.state.sheetSize;
    const position = Point2D.create(0, 0);
    const child = new PixelEditor(position, size);
    this.appView.setChild(child);
  }

  private attachObservers() {
    // this.appView will be notified and its stateManager reference will be updated whenever the state of this.stateManager changes
    this.stateManager.attach(this.appView);

    // force notify
    this.stateManager.notify();
  }

  public mountEvents() {
    this.appView.mountEvents();
  }

  public unmountEvents() {
    this.appView.unmountEvents();
  }

  public setStateManager(stateManager: StateManager): void {
    this.stateManager = stateManager;
    this.attachObservers();
  }

  public setState(state: State): void {
    this.stateManager.setAppState(state);
  }

  public recenterEditor() {
    this.appView.recenterEditor();
  }

  public getState(): State {
    return this.stateManager.state;
  }

  public static create(containerReference: HTMLDivElement, stateManager: StateManager): App {
    return new App(containerReference, stateManager);
  }
}
