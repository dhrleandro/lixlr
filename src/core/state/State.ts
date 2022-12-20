import Rect2D from "../entities/Rect2D";
import RGBA from "../entities/RGBA";
import LayerManager from "../LayerManager";
import { ToolType } from "../tools/ToolType";
import StateManager from "./StateManager";

export interface State {
  sheetSize: Rect2D,
  scale: number,
  layerManager: LayerManager,
  selectedLayerId: number,
  selectedTool: ToolType,
  selectedColor: RGBA,
}

export function createInitialAppState(): State {

  const sheetDimension = Rect2D.create(400, 400);
  const layerManager = new LayerManager(sheetDimension.width, sheetDimension.height);
  layerManager.createLayer();
  const lastLayerId = layerManager.getLastLayerId();

  const appState: State = {
    sheetSize: Rect2D.create(sheetDimension.width, sheetDimension.height),
    scale: 1,
    layerManager: layerManager,
    selectedLayerId: lastLayerId,
    selectedTool: ToolType.HAND,
    selectedColor: RGBA.create(0,0,0)
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
