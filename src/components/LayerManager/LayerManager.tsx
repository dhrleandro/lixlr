import React from 'react';
import Sidebar from '../Sidebar';
import { Layers } from '../../icons';
import styles from "../../styles/LayerManager.module.css";
import Layer from '../../core/entities/Layer';
import Item from "./Item";

function LayerManager() {

  const layer = new Layer('Teste 1', 400, 400, true);

  return (
    <Sidebar
      openIcon={<Layers/>}
    >
      <div className={styles.LayerManager}>
        <Item index={0} layer={layer} selected={false}></Item>
        <Item index={0} layer={layer} selected={true}></Item>
        <Item index={0} layer={layer} selected={false}></Item>
        <Item index={0} layer={layer} selected={false}></Item>
        <Item index={0} layer={layer} selected={false}></Item>
        <Item index={0} layer={layer} selected={false}></Item>
        <Item index={0} layer={layer} selected={false}></Item>
        <Item index={0} layer={layer} selected={false}></Item>
        <Item index={0} layer={layer} selected={false}></Item>
      </div>
    </Sidebar>
  );
}

export default LayerManager;
