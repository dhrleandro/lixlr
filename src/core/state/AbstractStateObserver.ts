import { State } from "./State";
import { Observer, Subject } from "./SubjectObserver";

export default abstract class AbstractStateObserver implements Observer {
  private manager: Subject | undefined;

  constructor(stateManager: Subject) {
    this.manager = stateManager;
  }

  public get state(): State | undefined {
    return this.manager?.state;
  }

  public get stateManager(): Subject | undefined {
    return this.manager;
  }

  public update(stateManager: Subject): void {
    this.manager = stateManager;
  }
}
