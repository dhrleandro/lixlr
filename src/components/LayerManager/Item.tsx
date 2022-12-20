import React, { MouseEventHandler } from "react";
import Layer from "../../core/entities/Layer";
import Button from "../Button";
import { Eye, EyeSlash, Trash } from "../../icons";
import styles from "../../styles/LayerManager.module.css";

type LayerItemPorps = {
  index: number,
  layer: Layer,
  selected: boolean,
  toggleVisible?: MouseEventHandler<HTMLButtonElement> | undefined,
  deleteLayer?: MouseEventHandler<HTMLButtonElement> | undefined
}

function Item(props: LayerItemPorps) {

  const canvas = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // append the layer canvas reference
    canvas.current?.appendChild(props.layer.canvas);
  });

  return (
    <div className={`${styles.layerItem} ${props.selected ? styles.itemSelected : ''}`}>

      <div className={styles.layerCanvas} ref={canvas}></div>

      <span>{props.layer.getName()}</span>

      <div className={styles.flex}>
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
          style={{color: 'var(--tomato11)'}}
          click={props.selected ? undefined : props.deleteLayer}
        >
          <Trash className={props.selected ? styles.deleteDisabled : ''}/>
        </Button>
      </div>
    </div>
  );
}

export default Item;
