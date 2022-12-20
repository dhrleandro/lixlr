import AppState from "./StateManager";

export interface State {
  scale: number;
}

export function createInitialAppState(): State {
  const appState: State = {
    scale: 1
  }

  return appState;
}
