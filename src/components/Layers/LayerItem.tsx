import React, { MouseEventHandler } from 'react';
import Layer from '../../core/entities/Layer';
import Button from '../Button';
import './Layers.css';
import { ReactComponent as Eye } from '../../assets/layers/eye.svg';
import { ReactComponent as EyeSlash } from '../../assets/layers/eye-slash.svg';
import { ReactComponent as Trash } from '../../assets/layers/trash.svg';

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
      <div>
        <Button
          w={24}
          h={24}
          click={props.toggleVisible}
        >
          {props.layer.isVisible() ? <Eye /> : <EyeSlash />}
        </Button>
        <Button
          w={24}
          h={24}
          style={{color: 'var(--red-500)'}}
        >
          <Trash />
        </Button>
      </div>
    </div>
  );
}

export default LayerItem;
