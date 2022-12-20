import React from 'react';
import Layer from '../../core/entities/Layer';
import Button from '../Button';
import DraggableContainer from '../DraggableContainer';
import LayerItem from './LayerItem';
import './Layers.css';

type LayersPorps = {
  layers: Layer[]
}

function Layers(props: LayersPorps) {

  const listItems = props.layers.map((layer: Layer, index: number) =>
    <li key={index}>
      <LayerItem index={index} layer={layer} />
    </li>
  );

  return (
      <DraggableContainer title='Layers'>
        <div className='Layers'>
          <ul>
            {listItems}
          </ul>
          <div className='buttom-bar'>
            <Button w={16} h={16}>+</Button>
          </div>
        </div>
      </DraggableContainer>
  );
}

export default Layers;
