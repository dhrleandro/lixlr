import React from "react";
import Toolbar from "./components/Toolbar";
import Colorbar from "./components/Colorbar";
import CanvasPainter from "./components/CanvasPainter";
import CameraViewer from "./components/CameraViewer";
import Layers from "./components/Layers";
import { ToolType } from "./core/tools/Type";
import { AppState } from "./core/AppState";
import ColorRgb from "./core/entities/ColorRgb";
import LayerManager from "./core/LayerManager";
import DraggableContainer from "./components/DraggableContainer";
import Button from "./components/Button";

const createCanvas = (width: number, height: number) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function App() {

  const sourceCanvas = React.useRef<HTMLCanvasElement>(createCanvas(300, 300));

  const [appState, setAppState] = React.useState<AppState>({
    scale: 1,
    primaryColor: ColorRgb.create(0,0,0),
    secondaryColor: ColorRgb.create(0,0,0),
    selectedTool: ToolType.HAND,
    layers: new LayerManager(0, 0)
  });

  const [debug, setDebug] = React.useState<boolean>(false);

  function setTool(tool: ToolType) {
    setAppState({...appState, selectedTool: tool});
  }

  function setColor(color: string) {
    const values = color.replaceAll('rgb(', '').replaceAll(')', '').split(',');

    if (values.length >= 3)
      setAppState({...appState, primaryColor: ColorRgb.create(parseInt(values[0]), parseInt(values[1]), parseInt(values[2]))});
  }

  function scaleUp(value: number) {
    const scale = appState.scale + value;
    setAppState({...appState, scale: scale});
  }

  function scaleDown(value: number) {
    const scale = appState.scale - value;
    setAppState({...appState, scale: scale});
  }

  // first render
  React.useEffect(() => {
    if (sourceCanvas.current) {

      const layerManager = new LayerManager(sourceCanvas.current.width, sourceCanvas.current.height);
      layerManager.createLayer();

      setAppState({
        ...appState,
        layers: layerManager
      });
    }
  }, []);

  // re-render with appState change
  React.useEffect(() => {}, [appState]);

  return (
    <div className="app">

      <Layers layers={appState.layers.getLayers()} />
      <DraggableContainer>
        <Button w={32} h={32} click={() => scaleUp(1)}>+</Button>
        <Button w={32} h={32} click={() => scaleDown(1)}>-</Button>
      </DraggableContainer>
      <Toolbar
        pen={() => setTool(ToolType.PEN)}
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
