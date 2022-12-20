import React from 'react';
import Sidebar from '../Sidebar';
import { Layers, Plus } from '../../icons';
import styles from "../../styles/LayerManager.module.css";
import Layer from '../../core/entities/Layer';
import Item from "./Item";
import { useDispatch, useTrackedState } from '../../state/store';
import { ActionType } from '../../core/state/Store';
import Button from '../Button';

function LayerManager() {

  const dispatch = useDispatch();
  const stateManager = useTrackedState();
  const layers = stateManager.state.layerManager.getLayers();

  function addLayer() {
    dispatch({ type: ActionType.CREATE_LAYER });
  }

  function selectLayer(id: number) {
    dispatch({ type: ActionType.SELECT_LAYER,  id });
  }

  function toggleVisible(layer: Layer, id: number) {
    const visible = !layer.isVisible();
    dispatch({ type: ActionType.TOGGLE_LAYER_VISIBILITY,  id, visible });
  }

  function deleteLayer(id: number) {
    dispatch({ type: ActionType.DELETE_LAYER,  id });
  }

  const listItems = layers.map((layer: Layer) =>
    <li
      key={layer.getId()}
      onClick={() => selectLayer(layer.getId())}
    >
      <Item
        index={layer.getId()}
        layer={layer}
        selected={stateManager.state.selectedLayerId === layer.getId()}
        toggleVisible={() => toggleVisible(layer, layer.getId())}
        deleteLayer={() => deleteLayer(layer.getId())}
      />
    </li>
  );

  return (
    <Sidebar
      openIcon={<Layers/>}
    >
      <div className={styles.LayerManager}>
        <div className={styles.layerList}>
          {listItems}
        </div>
        <div className={styles.bottomBar}>
          <Button light={true} w={24} h={24} click={addLayer}><Plus /></Button>
        </div>
      </div>
    </Sidebar>
  );
}

export default LayerManager;
