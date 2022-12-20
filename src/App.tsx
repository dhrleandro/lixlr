import React from "react";
import Toolbar from "./components/Toolbar";
import Colorbar from "./components/Colorbar";
import CanvasPainter from "./components/CanvasPainter";
import CameraViewer from "./components/CameraViewer";
import Layers from "./components/Layers";
import { ToolType } from "./core/tools/Type";
import LayerManager from "./core/LayerManager";
import DraggableContainer from "./components/DraggableContainer";
import Button from "./components/Button";
import { useDispatch, useTrackedState } from "./store/store";
import { ScaleData } from "./core/HTMLDivCameraViewer";
import { useStateRef } from "./hooks/useStateRef";

const createCanvas = (width: number, height: number) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function App() {

  const sourceCanvas = React.useRef<HTMLCanvasElement>(createCanvas(300, 300));

  const dispatch = useDispatch();
  const appState = useTrackedState();
  const [debug, setDebug] = React.useState<boolean>(false);
  const [scale, setScale] = useStateRef<number>(0);

  function setTool(tool: ToolType) {
    dispatch({ type: 'SELECT_TOOL', tool });
  }

  function setColor(color: string) {
    dispatch({ type: 'SELECT_COLOR', color });
  }

  function scaleUp() {
    const newScale = scale() + 0.5;
    dispatch({ type: 'ZOOM_UP', value: newScale });
  }

  function scaleDown() {
    const newScale = scale() - 0.5;
    dispatch({ type: 'ZOOM_DOWN', value: newScale });
  }

  function changedScaleEventCallback(event: CustomEvent<ScaleData>): void {
    setScale(event.detail.scale);
  }

  // first render
  React.useEffect(() => {
    if (sourceCanvas.current) {

      const layerManager = new LayerManager(sourceCanvas.current.width, sourceCanvas.current.height);
      layerManager.createLayer();

      dispatch({ type: 'SET_LAYER_MANAGER', layerManager });
    }
  }, []);

  // re-render with appState change
  React.useEffect(() => {
    setScale(appState.scale);
  }, [appState]);

  return (
    <div className="app">

      <Layers />
      <DraggableContainer>
        <Button w={32} h={32} click={scaleUp}>+</Button>
        <Button w={32} h={32} click={scaleDown}>-</Button>
      </DraggableContainer>
      <Toolbar
        pen={() => setTool(ToolType.PEN)}
        brush={() => setTool(ToolType.BRUSH)}
        eraser={() => setTool(ToolType.ERASER)}
        hand={() => setTool(ToolType.HAND)}
      />
      <div className="Container">
        <CameraViewer
          scale={appState.scale}
          enableMousePan={appState.selectedTool === ToolType.HAND}
          debug={debug}
          changedScaleEventCallback={changedScaleEventCallback}
        >
          <CanvasPainter
            sourceCanvas={sourceCanvas}
            appState={appState}
            width={300}
            height={300}
          />
        </CameraViewer>
      </div>
      <Colorbar
        colorSelect={setColor}
      ></Colorbar>
    </div>
  );
}

export default App;
