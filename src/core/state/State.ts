import { ToolType } from "../tools/ToolType";
import StateManager from "./StateManager";

export interface State {
  selectedTool: ToolType,
  scale: number;
}

export function createInitialAppState(): State {
  const appState: State = {
    selectedTool: ToolType.HAND,
    scale: 1
  }

  return appState;
}

export function createDefaultStateManager(): StateManager {
  const appState: State = {
    selectedTool: ToolType.HAND,
    scale: 1
  }

  const stateManager = new StateManager(appState);
  return stateManager;
}

export function createStateManager(state: State): StateManager {
  return new StateManager(state);
}
