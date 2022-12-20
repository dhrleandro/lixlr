import { Observer, Subject } from "./SubjectObserver";

export default abstract class AbstractStateObserver implements Observer {
  private state: Subject | undefined;

  constructor(appState: Subject) {
    this.state = appState;
  }

  public get appState(): Subject | undefined {
    return this.appState;
  }

  public update(appState: Subject): void {
    this.state = appState;
  }
}
