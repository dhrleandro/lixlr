import React from 'react';
import Layer from '../../core/entities/Layer';
import Button from '../Button';
import './Layers.css';

type LayerItemPorps = {
  index: number,
  layer: Layer,
  selected: boolean
}

function LayerItem(props: LayerItemPorps) {

  return (
    <div className={`LayerItem ${props.selected ? 'selected' : ''}`}>
      <span>{props.layer.getName()}</span>
      <Button>Delete</Button>
    </div>
  );
}

export default LayerItem;
