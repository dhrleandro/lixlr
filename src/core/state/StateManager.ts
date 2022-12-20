import { State } from "./State";
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
          const immutableState: Readonly<State> = {
            ...this.state
          };
          observer.update(immutableState);
      }
  }

  get appState(): State {
    return this.state;
  }

  public setAppState(newState: State): void {
      this.state = newState;
      this.notify();
  }
}
