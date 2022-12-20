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

  function setTool(tool: ToolType) {
    dispatch({ type: 'SELECT_TOOL', tool });
  }

  function setColor(color: string) {
    dispatch({ type: 'SELECT_COLOR', color });
  }

  function scaleUp(value: number) {
    dispatch({ type: 'ZOOM_UP', value });
  }

  function scaleDown(value: number) {
    dispatch({ type: 'ZOOM_DOWN', value });
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
  React.useEffect(() => {}, [appState]);

  return (
    <div className="app">

      <Layers />
      <DraggableContainer>
        <Button w={32} h={32} click={() => scaleUp(1)}>+</Button>
        <Button w={32} h={32} click={() => scaleDown(1)}>-</Button>
      </DraggableContainer>
      <Toolbar
        pen={() => setTool(ToolType.PEN)}
        brush={() => setTool(ToolType.BRUSH)}
        hand={() => setTool(ToolType.HAND)}
      />
      <div className="Container">
        <CameraViewer scale={appState.scale} enableMousePan={appState.selectedTool === ToolType.HAND} debug={debug}>
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
