import React from 'react';
import App from '../core/App';
import { State } from '../core/state/State';

export const useCanvasPixelEditor = (containerReference: React.RefObject<HTMLDivElement>, state: State) => {

  const pixelEditorApp = React.useRef<App>();

  React.useEffect(() => {
    if (!containerReference.current) return;

    if (!pixelEditorApp.current) {
      pixelEditorApp.current = App.create(containerReference.current, state);
      pixelEditorApp.current!.mountEvents();
    }

    pixelEditorApp.current.setState(state);

    return () => {
      if (!pixelEditorApp.current) return;
      pixelEditorApp.current.unmountEvents();
    }

  }, [containerReference, state]);
}
