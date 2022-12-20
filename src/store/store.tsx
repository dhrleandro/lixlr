import { useReducer } from 'react';
import { createContainer } from 'react-tracked';
import { AppState } from '../core/AppState';
import ColorRgb from '../core/entities/ColorRgb';
import Layer from '../core/entities/Layer';
import LayerManager from '../core/LayerManager';
import { ToolType } from '../core/tools/Type';

function setColor(appState: AppState, color: string): AppState {
  const values = color.replaceAll('rgb(', '').replaceAll(')', '').split(',');

  if (values.length >= 3) {
    const state = {
      ...appState,
      primaryColor: ColorRgb.create(
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
  const scale = appState.scale + value;
  return { ...appState, scale: scale };
}

function zoomDown(appState: AppState, value: number) {
  const scale = appState.scale - value;
  return { ...appState, scale: scale };
}

function addLayer(appState: AppState) {
  const layers = appState.layers;
  const layerManager = new LayerManager(layers.getWidth(), layers.getHeight());

  layerManager.setLayers(layers.getLayers());
  layerManager.createLayer();

  return { ...appState, layers: layerManager };
}

function setLayerVisibility(appState: AppState, id: number, visible: boolean) {
  const layers = appState.layers;
  const layerManager = new LayerManager(layers.getWidth(), layers.getHeight());

  const newLayers = layers.getLayers();
  newLayers[id].setVisible(visible);
  layerManager.setLayers(newLayers);

  return { ...appState, layers: layerManager };
}

type Action =
  | { type: 'SELECT_TOOL'; tool: ToolType }
  | { type: 'SELECT_COLOR'; color: string }
  | { type: 'ZOOM_UP'; value: number }
  | { type: 'ZOOM_DOWN'; value: number }
  | { type: 'SET_LAYER_MANAGER'; layerManager: LayerManager }
  | { type: 'SELECT_LAYER'; id: number }
  | { type: 'TOGGLE_LAYER_VISIBILITY'; id: number; visible: boolean }
  | { type: 'ADD_LAYER'/*; layer: Layer */}

const initialState: AppState = {
  scale: 1,
  primaryColor: ColorRgb.create(0, 0, 0),
  secondaryColor: ColorRgb.create(0, 0, 0),
  selectedTool: ToolType.HAND,
  layers: new LayerManager(0, 0),
  selectedLayer: 0
};

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
      return { ...state, layers: action.layerManager };

    case 'SELECT_LAYER':
      return { ...state, selectedLayer: action.id };

    case 'TOGGLE_LAYER_VISIBILITY':
      return setLayerVisibility(state, action.id, action.visible);

    case 'ADD_LAYER':
      return addLayer(state);

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
