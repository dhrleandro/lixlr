import React from 'react';
import { useCanvasPixelEditor } from '../hooks/useCanvasPixelEditor';
import { AppState } from '../core/AppState';

type CanvasPainterProps = {
  sourceCanvas: React.RefObject<HTMLCanvasElement>;
  appState: AppState,
  width: number;
  height: number;
}

function CanvasPainter(props: CanvasPainterProps) {

  const destinationCanvas = React.useRef<HTMLCanvasElement>(null);

  useCanvasPixelEditor(destinationCanvas, props.appState);

  return (
    <div className="CanvasPainter">
      <canvas ref={destinationCanvas} width={props.width} height={props.height}></canvas>
    </div>
  );
}

export default CanvasPainter;
