import { State } from "./State";
import { Observer } from "./SubjectObserver";

export default abstract class AbstractStateObserver implements Observer {
  private appState: Readonly<State>;

  constructor(appState: Readonly<State>) {
    this.appState = appState;
  }

  private getState(): Readonly<State> {
    return this.appState;
  }

  public update(appState: Readonly<State>): void {
    this.appState = appState;
  }
}
