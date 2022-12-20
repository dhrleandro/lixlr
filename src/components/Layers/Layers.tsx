import React from 'react';
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
    dispatch({ type: 'SELECT_LAYER',  id } );
  }

  const listItems = layers.map((layer: Layer, index: number) =>
    <li
      key={index}
      onClick={() => selectLayer(index)}
    >
      <LayerItem index={index} layer={layer} selected={appState.selectedLayer === index} />
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
