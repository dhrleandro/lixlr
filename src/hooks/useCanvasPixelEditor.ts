import React from 'react';
import App from '../core/App';
import StateManager from '../core/state/StateManager';
import { ActionType } from '../core/state/Store';
import { useDispatch } from '../state/store';

export const useCanvasPixelEditor = (containerReference: React.RefObject<HTMLDivElement>, stateManager: StateManager) => {

  const pixelEditorApp = React.useRef<App>();
  const dispatch = useDispatch();

  function onWheel() {
    if (!pixelEditorApp.current)
      return;

    dispatch({ type: ActionType.SET_ZOOM, value: pixelEditorApp.current.getState().scale});
  }

  React.useEffect(() => {
    if (!containerReference.current) return;

    if (!pixelEditorApp.current) {
      pixelEditorApp.current = App.create(containerReference.current, stateManager);
      pixelEditorApp.current.mountEvents();

      // observer app local zoom state
      containerReference.current.addEventListener("wheel", onWheel);
    }

    pixelEditorApp.current.setStateManager(stateManager);

    return () => {
      if (!pixelEditorApp.current) return;
      pixelEditorApp.current.unmountEvents();
      // containerReference.current!.removeEventListener("wheel", onWheel);
    }

  }, [containerReference, stateManager]);

  const recenterEditor = () => {
    pixelEditorApp.current?.recenterEditor();
  }

  return {
    recenterEditor,
  }
}
