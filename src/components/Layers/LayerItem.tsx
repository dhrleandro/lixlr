import React, { MouseEventHandler } from 'react';
import Layer from '../../core/entities/Layer';
import Button from '../Button';
import './Layers.css';

type LayerItemPorps = {
  index: number,
  layer: Layer,
  selected: boolean,
  toggleVisible: MouseEventHandler<HTMLButtonElement> | undefined
}

function LayerItem(props: LayerItemPorps) {

  return (
    <div className={`LayerItem ${props.selected ? 'selected' : ''}`}>
      <span>{props.layer.getName()}</span>
      <Button w={16} h={16} click={props.toggleVisible}>{props.layer.isVisible() ? 'h' : 's'}</Button>
      <Button>Delete</Button>
    </div>
  );
}

export default LayerItem;
