import React from 'react';
import HTMLDivCameraViewer, { ScaleData } from '../core/HTMLDivCameraViewer';

export const useCameraViewer = (
  divReference: React.RefObject<HTMLDivElement>,
  enableMousePan: boolean,
  scale: number,
  changedScaleEventCallback?: (event: CustomEvent<ScaleData>) => void
) => {

  const cameraViewer = React.useRef<HTMLDivCameraViewer>();

  const handleChangedScaleEvent = (event: CustomEvent<ScaleData>) => {
    if (changedScaleEventCallback)
      changedScaleEventCallback(event);
  }

  // colocar um listener pra receber a nova escala sempre que ela mudar
  React.useEffect(() => {
    if (!divReference.current) return;

    if (!cameraViewer.current) {
      cameraViewer.current = new HTMLDivCameraViewer(divReference.current);
      cameraViewer.current.mountEvents();
      cameraViewer.current.alignToCenter();
    }

    if (cameraViewer.current) {
      cameraViewer.current.setDivReference(divReference.current);
      cameraViewer.current.setEnableMousePan(enableMousePan);
      cameraViewer.current.setScale(scale);

      // https://stackoverflow.com/questions/68579484/how-to-handle-event-type-and-customevent-type-on-eventlisteners-in-typescri
      document.addEventListener(HTMLDivCameraViewer.EVENT_CHANGED_SCALE, handleChangedScaleEvent as (e: Event) => void);
    }

    return () => {
      if (!cameraViewer.current) return;
      cameraViewer.current.unmountEvents();
      document.removeEventListener(HTMLDivCameraViewer.EVENT_CHANGED_SCALE, handleChangedScaleEvent as (e: Event) => void);
    }

  }, [divReference, enableMousePan, scale] );
}
