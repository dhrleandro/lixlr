import { useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { AppState } from '../core/AppState';
import ColorRgba from '../core/entities/ColorRgba';
import Layer from '../core/entities/Layer';
import LayerManager from '../core/LayerManager';
import { ToolType } from '../core/tools/Type';

type Action =
  | { type: 'SELECT_TOOL'; tool: ToolType }
  | { type: 'SELECT_COLOR'; color: string }
  | { type: 'ZOOM_UP'; value: number }
  | { type: 'ZOOM_DOWN'; value: number }
  | { type: 'SET_LAYER_MANAGER'; layerManager: LayerManager }
  | { type: 'SELECT_LAYER'; id: number }
  | { type: 'DELETE_LAYER'; id: number }
  | { type: 'TOGGLE_LAYER_VISIBILITY'; id: number; visible: boolean }
  | { type: 'ADD_LAYER'/*; layer: Layer */}

const initialState: AppState = {
  scale: 1,
  primaryColor: ColorRgba.create(0, 0, 0),
  secondaryColor: ColorRgba.create(0, 0, 0),
  selectedTool: ToolType.HAND,
  layers: new LayerManager(0, 0),
  selectedLayer: 0
};

function setColor(appState: AppState, color: string): AppState {
  const values = color.replaceAll('rgb(', '').replaceAll(')', '').split(',');

  if (values.length >= 3) {
    const state = {
      ...appState,
      primaryColor: ColorRgba.create(
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

function zoomUp(appState: AppState, value: number) {
  return { ...appState, scale: value };
}

function zoomDown(appState: AppState, value: number) {
  return { ...appState, scale: value };
}

function addLayer(appState: AppState) {
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

const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {

    case 'SELECT_TOOL':
      return {
        ...state,
        selectedTool: action.tool
      };


    case 'SELECT_COLOR':
      return setColor(state, action.color);


    case 'ZOOM_UP':
      return zoomUp(state, action.value);

    case 'ZOOM_DOWN':
      return zoomDown(state, action.value);


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

    default:
      return state;
  }
};

const useValue = () => useReducer(reducer, initialState);

export const {
  Provider: AppStateProvider,
  useTrackedState,
  useUpdate: useDispatch,
} = createContainer(useValue);
