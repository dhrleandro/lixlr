import CanvasView from "./CanvasView";
import Point2D from "./entities/Point2D";
import Rect2D from "./entities/Rect2D";
import PixelEditor from "./PixelEditor";
import StateManager from "./state/StateManager";
import { createInitialAppState, State } from "./state/State";
import { ActionType, makeAction } from "./state/Store";

export default class App {

  private stateManager: StateManager;
  private appView: CanvasView;

  constructor(containerReference: HTMLDivElement, state: State) {
    this.stateManager = new StateManager(state);
    this.appView = new CanvasView(containerReference, this.stateManager);

    this.attachObservers();

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

  // public setStateManager(stateManager: StateManager): void {
  //   this.stateManager = stateManager;
  //   this.attachObservers();
  // }

  public setState(state: State): void {
    this.stateManager.setAppState(state);
  }

  public static create(containerReference: HTMLDivElement, state: State): App {
    return new App(containerReference, state);
  }
}
