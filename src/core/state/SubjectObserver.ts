// https://refactoring.guru/pt-br/design-patterns/observer

import { State } from "./State";
import { Action } from "./Store";

/**
 * The Subject interface declares a set of methods for managing subscribers.
 */
 export interface Subject {
  // Attach an observer to the subject.
  attach(observer: Observer): void;

  // Detach an observer from the subject.
  detach(observer: Observer): void;

  // Notify all observers about an event.
  notify(): void;

  updateState(action: Action): void;
  get state(): State;
}

/**
 * The Observer interface declares the update method, used by subjects.
 */
export interface Observer {
  update(stateManager: Subject): void;
}
