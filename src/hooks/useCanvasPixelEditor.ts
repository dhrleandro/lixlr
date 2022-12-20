import React from 'react';
import App from '../core/App';

export const useCanvasPixelEditor = (containerReference: React.RefObject<HTMLDivElement>/*, appState: AppState*/) => {

  const pixelEditorApp = React.useRef<App>();

  React.useEffect(() => {
    if (!containerReference.current) return;

    if (!pixelEditorApp.current) {
      pixelEditorApp.current = App.create(containerReference.current);
      pixelEditorApp.current!.mountEvents();
    }
    // pixelEditorApp.current.setAppState(appState);

    return () => {
      if (!pixelEditorApp.current) return;
      pixelEditorApp.current.unmountEvents();
    }

  }, [containerReference/*, appState*/]);
}
