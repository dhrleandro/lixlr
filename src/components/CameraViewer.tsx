import React from 'react';
import { AppState } from '../core/AppState';
import { ScaleData } from '../core/HTMLDivCameraViewer';
import { useCameraViewer } from '../hooks/useCameraViewer';

type CameraViewerProps = {
  enableMousePan: boolean;
  debug?: boolean;
  children?: React.ReactNode;
  scale: number;
}

function CameraViewer(props: CameraViewerProps) {

  const handleChangedScaleEvent = (event: CustomEvent<ScaleData>) => {
    // console.log(event.detail.scale);
  }

  const reference = React.useRef<HTMLDivElement>(null);
  const alignToCenter = useCameraViewer(reference, props.enableMousePan, props.scale, handleChangedScaleEvent);

  const rerender = React.useRef(0);
  rerender.current += 1;
  return (
    <div ref={reference} className="CanvasViewer">
      { props.debug &&
        <span className="debug">Renderizações: {rerender.current}</span>
      }
      {props.children}
    </div>
  );
}

export default CameraViewer;
