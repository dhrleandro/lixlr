import React from 'react';
import App from '../core/App';
import StateManager from '../core/state/StateManager';

export const useCanvasPixelEditor = (containerReference: React.RefObject<HTMLDivElement>, stateManager: StateManager) => {

  const pixelEditorApp = React.useRef<App>();

  React.useEffect(() => {
    if (!containerReference.current) return;

    if (!pixelEditorApp.current) {
      pixelEditorApp.current = App.create(containerReference.current, stateManager);
      pixelEditorApp.current!.mountEvents();
    }

    pixelEditorApp.current.setStateManager(stateManager);

    return () => {
      if (!pixelEditorApp.current) return;
      pixelEditorApp.current.unmountEvents();
    }

  }, [containerReference, stateManager]);
}
