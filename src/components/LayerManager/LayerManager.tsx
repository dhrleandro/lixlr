import React from 'react';
import Sidebar from '../Sidebar';
import { Layers } from '../../icons';

function LayerManager() {

  return (
    <Sidebar
      openIcon={<Layers/>}
    >
    </Sidebar>
  );
}

export default LayerManager;
