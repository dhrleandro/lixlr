import Rect2D from "../entities/Rect2D";
import LayerManager from "../LayerManager";
import { ToolType } from "../tools/ToolType";
import StateManager from "./StateManager";

export interface State {
  sheetSize: Rect2D,
  layerManager: LayerManager,
  selectedLayerId: number,
  selectedTool: ToolType,
  scale: number;
}

export function createInitialAppState(): State {

  const sheetDimension = Rect2D.create(400, 400);

  const appState: State = {
    sheetSize: Rect2D.create(sheetDimension.width, sheetDimension.height),
    layerManager: new LayerManager(sheetDimension.width, sheetDimension.height),
    selectedLayerId: 0,
    selectedTool: ToolType.HAND,
    scale: 1
  }

  return appState;
}

export function createDefaultStateManager(): StateManager {
  const appState = createInitialAppState();

  const stateManager = new StateManager(appState);
  return stateManager;
}

export function createStateManager(state: State): StateManager {
  return new StateManager(state);
}
