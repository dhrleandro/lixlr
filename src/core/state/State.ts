import { ToolType } from "../tools/ToolType";

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
