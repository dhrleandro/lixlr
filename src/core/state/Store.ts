import RGBA from "../entities/RGBA";
import { ToolType } from "../tools/ToolType";
import { createInitialAppState, State } from "./State";

export enum ActionType {
  ZOOM_UP = "ZOOM_UP",
  ZOOM_DOWN = "ZOOM_DOWN",
  SET_ZOOM = "SET_ZOOM",
}

export type Action =
  | { type: 'SELECT_TOOL'; value: ToolType }
  | { type: 'SELECT_COLOR'; value: string }
  | { type: 'ZOOM_UP'; value: number }
  | { type: 'ZOOM_DOWN'; value: number }
  | { type: 'SET_ZOOM'; value: number }
//  | { type: 'SET_LAYER_MANAGER'; layerManager: LayerManager }
//  | { type: 'SELECT_LAYER'; id: number }
//  | { type: 'DELETE_LAYER'; id: number }
//  | { type: 'TOGGLE_LAYER_VISIBILITY'; id: number; visible: boolean }
//  | { type: 'ADD_LAYER'/*; layer: Layer */}

export function makeAction(type: ActionType, value: any): Action {
  return {
    type,
    value
  };
}

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

/*
function addLayer(appState: State): State {
  const layers = appState.layers;
  const layerManager = new LayerManager(layers.getWidth(), layers.getHeight());

  layerManager.setLayers(layers.getLayers());
  layerManager.createLayer();
  const lastId = layerManager.getLastLayerId();

  return { ...appState, layers: layerManager, selectedLayer: lastId };
}

function setLayerVisibility(appState: AppState, id: number, visible: boolean) {
  const layers = appState.layers;
  layers.setVisible(id, visible);

  const layerManager = new LayerManager(layers.getWidth(), layers.getHeight());
  layerManager.setLayers(layers.getLayers());

  return { ...appState, layers: layerManager };
}

function deleteLayer(appState: AppState, id: number) {
  if (appState.selectedLayer === id || appState.layers.getLayers().length <= 1)
    return appState;

  const layers = appState.layers;

  const layerManager = new LayerManager(layers.getWidth(), layers.getHeight());
  layerManager.setLayers(layers.getLayers());
  layerManager.deleteLayer(id);

  return { ...appState, layers: layerManager };
}
*/

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {

  /*
    case 'SELECT_TOOL':
      return {
        ...state,
        selectedTool: action.tool
      };


    case 'SELECT_COLOR':
      return setColor(state, action.color);
  */

    case 'ZOOM_UP':
      return zoomUp(state, action.value);

    case 'ZOOM_DOWN':
      return zoomDown(state, action.value);

    case 'SET_ZOOM':
      return { ...state, scale: action.value };
  /*
    case 'SET_LAYER_MANAGER':
      const lastId = action.layerManager.getLastLayerId();
      return { ...state, layers: action.layerManager, selectedLayer: lastId };

    case 'SELECT_LAYER':
      return { ...state, selectedLayer: action.id };

    case 'TOGGLE_LAYER_VISIBILITY':
      return setLayerVisibility(state, action.id, action.visible);

    case 'ADD_LAYER':
      return addLayer(state);

    case 'DELETE_LAYER':
      return deleteLayer(state, action.id);
  */

    default:
      return state;
  }
};
