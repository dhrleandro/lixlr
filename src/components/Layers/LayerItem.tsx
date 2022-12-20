import React from 'react';
import Layer from '../../core/entities/Layer';
import Button from '../Button';
import './Layers.css';

type LayerItemPorps = {
  index: number,
  layer: Layer
}

function LayerItem(props: LayerItemPorps) {

  const [index, setIndex] = React.useState(props.index);

  return (
    <div className='LayerItem'>
      <span>{props.layer.getName()}</span>
      <Button>Delete</Button>
    </div>
  );
}

export default LayerItem;
