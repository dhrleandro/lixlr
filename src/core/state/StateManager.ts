import { State } from "./State";
import { Action, reducer } from "./Store";
import { Observer, Subject } from "./SubjectObserver";

/**
 * The Subject owns some important state and notifies observers when the state
 * changes.
 */
 export default class StateManager implements Subject {

  private state: State;

  constructor(state: State) {
    this.state = state;
  }

  /**
   * @type {Observer[]} List of subscribers. In real life, the list of
   * subscribers can be stored more comprehensively (categorized by event
   * type, etc.).
   */
  private observers: Observer[] = [];

  /**
   * The subscription management methods.
   */
  public attach(observer: Observer): void {
      const isExist = this.observers.includes(observer);
      if (isExist) {
          return;
      }

      this.observers.push(observer);
  }

  public detach(observer: Observer): void {
      const observerIndex = this.observers.indexOf(observer);
      if (observerIndex === -1) {
          return;
      }

      this.observers.splice(observerIndex, 1);
  }

  /**
   * Trigger an update in each subscriber.
   */
  public notify(): void {
      for (const observer of this.observers) {
        observer.update(this);
      }
  }

  get appState(): State {
    return this.state;
  }

  private setAppState(newState: State): void {
      this.state = newState;
      this.notify();
  }

  public updateState(action: Action): void {
    const newState = reducer(this.appState, action);
    this.setAppState(newState);
  }
}
