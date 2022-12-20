import React from 'react';
import Sidebar from '../Sidebar';
import styles from "../../styles/ToolProperty.module.css";
import { useDispatch, useTrackedState } from '../../state/store';
import { ActionType } from '../../core/state/Store';
import Button from '../Button';
import { Adjustments } from '../../icons';

function ToolProperty() {

  const dispatch = useDispatch();
  const stateManager = useTrackedState();

  // const listItems = layers.map((layer: Layer) =>
  //   <li
  //     key={layer.getId()}
  //     onClick={() => selectLayer(layer.getId())}
  //   >
  //     <Item
  //       index={layer.getId()}
  //       layer={layer}
  //       selected={stateManager.state.selectedLayerId === layer.getId()}
  //       toggleVisible={() => toggleVisible(layer, layer.getId())}
  //       deleteLayer={() => deleteLayer(layer.getId())}
  //     />
  //   </li>
  // );

  return (
    <Sidebar
      openIcon={<Adjustments/>}
      right={false}
      buttonTop={36}
    >
      <div className={styles.toolProperty}>
        <span>aaa</span>
        <span>bbbb</span>
      </div>
    </Sidebar>
  );
}

export default ToolProperty;
