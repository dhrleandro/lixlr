import React from 'react';
import { MouseEvent } from 'react';
import Layer from '../../core/entities/Layer';
import { useDispatch, useTrackedState } from '../../store/store';
import Button from '../Button';
import DraggableContainer from '../DraggableContainer';
import LayerItem from './LayerItem';
import './Layers.css';

function Layers() {

  const dispatch = useDispatch();
  const appState = useTrackedState();
  const layers = appState.layers.getLayers();

  function addLayer() {
    dispatch({ type: 'ADD_LAYER' });
  }

  function selectLayer(id: number) {
    dispatch({ type: 'SELECT_LAYER',  id });
  }

  function toggleVisible(layer: Layer, id: number) {
    const visible = !layer.isVisible();
    dispatch({ type: 'TOGGLE_LAYER_VISIBILITY',  id, visible });
  }

  function deleteLayer(layer: Layer, id: number) {
    const visible = !layer.isVisible();
    dispatch({ type: 'DELETE_LAYER',  id });
  }

  const listItems = layers.map((layer: Layer) =>
    <li
      key={layer.getId()}
      onClick={() => selectLayer(layer.getId())}
    >
      <LayerItem
        index={layer.getId()}
        layer={layer}
        selected={appState.selectedLayer === layer.getId()}
        toggleVisible={() => toggleVisible(layer, layer.getId())}
        deleteLayer={() => deleteLayer(layer, layer.getId())}
      />
    </li>
  );

  return (
      <DraggableContainer title='Layers'>
        <div className='Layers'>
          <ul>
            { listItems }
          </ul>
          <div className='buttom-bar'>
            <Button w={16} h={16} click={addLayer}>+</Button>
          </div>
        </div>
      </DraggableContainer>
  );
}

export default Layers;
