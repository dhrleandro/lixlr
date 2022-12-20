import RGBA from "../entities/RGBA";
import LayerManager from "../LayerManager";
import { ToolType } from "../tools/ToolType";
import { createInitialAppState, createStateManager, State } from "./State";
import StateManager from "./StateManager";

export enum ActionType {
  SELECT_TOOL = "SELECT_TOOL",
  SET_TOOL_SIZE = "SET_TOOL_SIZE",
  SELECT_COLOR = "SELECT_COLOR",

  // ZOOM_UP = "ZOOM_UP",
  // ZOOM_DOWN = "ZOOM_DOWN",
  SET_ZOOM = "SET_ZOOM",

  SET_LAYER_MANAGER = "SET_LAYER_MANAGER",
  SELECT_LAYER = "SELECT_LAYER",
  CREATE_LAYER = "CREATE_LAYER",
  DELETE_LAYER = "DELETE_LAYER",
  TOGGLE_LAYER_VISIBILITY = "TOGGLE_LAYER_VISIBILITY",
  MOVE_UP_LAYER = "MOVE_UP_LAYER",
  MOVE_DOWN_LAYER = "MOVE_DOWN_LAYER"
}

export type Action =
  | { type: ActionType.SELECT_TOOL; value: ToolType }
  | { type: ActionType.SET_TOOL_SIZE; value: number }
  | { type: ActionType.SELECT_COLOR; value: RGBA }

  // | { type: ActionType.'ZOOM_UP'; value: number }
  // | { type: ActionType.'ZOOM_DOWN'; value: number }[]
  | { type: ActionType.SET_ZOOM; value: number }

  | { type: ActionType.SET_LAYER_MANAGER; layerManager: LayerManager }
  | { type: ActionType.SELECT_LAYER; id: number }
  | { type: ActionType.CREATE_LAYER}
  | { type: ActionType.DELETE_LAYER; id: number }
  | { type: ActionType.TOGGLE_LAYER_VISIBILITY; id: number, visible: boolean }
  | { type: ActionType.MOVE_UP_LAYER; id: number }
  | { type: ActionType.MOVE_DOWN_LAYER; id: number }

const initialState: State = createInitialAppState();

/*
function setColor(appState: State, color: string): State {
  const values = color.replaceAll('rgb(', '').replaceAll(')', '').split(',');

  if (values.length >= 3) {
    const state = {
      ...appState,
      primaryColor: RGBA.create(
        parseInt(values[0]),
        parseInt(values[1]),
        parseInt(values[2])
      )
    };
    return state;
  } else {
    return appState;
  }
}
*/

function zoomUp(appState: State, value: number): State {
  return { ...appState, scale: value };
}

function zoomDown(appState: State, value: number): State {
  return { ...appState, scale: value };
}

function addLayer(stateManager: StateManager): StateManager {
  const layers = stateManager.state.layerManager;
  const layerManager = new LayerManager(layers.getWidth(), layers.getHeight());

  layerManager.setLayers(layers.getLayers());
  layerManager.createLayer();
  const lastId = layerManager.getLastLayerId();

  return createStateManager({ ...stateManager.state, layerManager: layerManager, selectedLayerId: lastId });
}

function setLayerVisibility(stateManager: StateManager, id: number, visible: boolean): StateManager {
  const layers = stateManager.state.layerManager;
  layers.setVisible(id, visible);

  const layerManager = new LayerManager(layers.getWidth(), layers.getHeight());
  layerManager.setLayers(layers.getLayers());

  return createStateManager({ ...stateManager.state, layerManager: layerManager });
}

function deleteLayer(stateManager: StateManager, id: number): StateManager {
  if (stateManager.state.selectedLayerId === id || stateManager.state.layerManager.getLayers().length <= 1)
    return stateManager;

  const layers = stateManager.state.layerManager;

  const layerManager = new LayerManager(layers.getWidth(), layers.getHeight());
  layerManager.setLayers(layers.getLayers());
  layerManager.deleteLayer(id);

  return createStateManager({ ...stateManager.state, layerManager: layerManager });
}

function moveLayerToUp(stateManager: StateManager, id: number): StateManager {
  const layers = stateManager.state.layerManager;

  const layerManager = new LayerManager(layers.getWidth(), layers.getHeight());
  layerManager.setLayers(layers.getLayers());
  layerManager.moveUp(id);

  return createStateManager({ ...stateManager.state, layerManager: layerManager });
}

function moveLayerToDown(stateManager: StateManager, id: number): StateManager {
  const layers = stateManager.state.layerManager;

  const layerManager = new LayerManager(layers.getWidth(), layers.getHeight());
  layerManager.setLayers(layers.getLayers());
  layerManager.moveDown(id);

  return createStateManager({ ...stateManager.state, layerManager: layerManager });
}

export const reducer = (stateManager: StateManager, action: Action): StateManager => {
  switch (action.type) {

    case ActionType.SELECT_TOOL:
      return createStateManager({
        ...stateManager.state,
        selectedTool: action.value
      });

    case ActionType.SET_TOOL_SIZE:
      return createStateManager({ ...stateManager.state, toolSize: action.value });

    case ActionType.SET_ZOOM:
      return createStateManager({ ...stateManager.state, scale: action.value });

    case ActionType.SELECT_COLOR:
      return createStateManager({ ...stateManager.state, selectedColor: action.value });

  /*
    case 'ZOOM_UP':
      return zoomUp(state, action.value);

    case 'ZOOM_DOWN':
      return zoomDown(state, action.value);
  */

    case ActionType.SET_LAYER_MANAGER:
      const lastId = action.layerManager.getLastLayerId();
      return createStateManager({ ...stateManager.state, layerManager: action.layerManager, selectedLayerId: lastId });

    case ActionType.SELECT_LAYER:
      return createStateManager({ ...stateManager.state, selectedLayerId: action.id });

    case ActionType.CREATE_LAYER:
      return addLayer(stateManager);

    case ActionType.DELETE_LAYER:
      return deleteLayer(stateManager, action.id);


    case ActionType.TOGGLE_LAYER_VISIBILITY:
      return setLayerVisibility(stateManager, action.id, action.visible);

    case ActionType.MOVE_UP_LAYER:
      return moveLayerToUp(stateManager, action.id);

    case ActionType.MOVE_DOWN_LAYER:
      return moveLayerToDown(stateManager, action.id);

    default:
      return stateManager;
  }
};
