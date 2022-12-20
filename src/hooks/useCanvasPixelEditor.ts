import React from 'react';
import { AppState } from '../core/AppState';
import CanvasPixelEditor from '../core/CanvasPixelEditor';

export const useCanvasPixelEditor = (canvasReference: React.RefObject<HTMLCanvasElement>, appState: AppState) => {

  const canvasPixelEditor = React.useRef<CanvasPixelEditor>();

  React.useEffect(() => {
    if (!canvasReference.current) return;

    if (!canvasPixelEditor.current) {
      canvasPixelEditor.current = new CanvasPixelEditor(canvasReference.current, appState);
    }

    canvasPixelEditor.current.mountEvents();
    canvasPixelEditor.current.setCanvasReference(canvasReference.current);
    canvasPixelEditor.current.setAppState(appState);

    return () => {
      if (!canvasPixelEditor.current) return;
      canvasPixelEditor.current.unmountEvents();
    }
  }, [canvasReference, appState]);
}
