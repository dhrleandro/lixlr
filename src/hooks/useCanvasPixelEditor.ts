import React from 'react';
import Editor from '../core/Editor';

export const useCanvasPixelEditor = (containerReference: React.RefObject<HTMLDivElement>/*, appState: AppState*/) => {

  const canvasPixelEditor = React.useRef<Editor>();

  React.useEffect(() => {
    if (!containerReference.current) return;

    if (!canvasPixelEditor.current) {
      canvasPixelEditor.current = new Editor(containerReference.current);
      canvasPixelEditor.current!.mountEvents();
    }
    // canvasPixelEditor.current.setAppState(appState);

    return () => {
      if (!canvasPixelEditor.current) return;
      canvasPixelEditor.current.unmountEvents();
    }

  }, [containerReference/*, appState*/]);
}
