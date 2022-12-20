// import { Tool, ToolType } from "./entities/Tool";
import { Tool } from "./tools/Tool";
import Point from "./entities/Point";
import { ToolType } from "./tools/Type";
import { createTool } from "./tools/Factory";
import { AppState } from "./AppState";
import { ToolProperty } from "./tools/Property";

export default class CanvasPixelEditor {

  private canvasReference: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  private virtualLayer: {
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  };

  private renderBuffer: {
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  };

  private selectedTool: Tool | undefined;
  private styles = {
    cursor: 'default'
  };

  private appState: AppState;

  private mouseDown: boolean = false;

  constructor(canvasReference: HTMLCanvasElement, appState: AppState) {
    this.canvasReference = canvasReference;
    this.context = this.canvasReference.getContext('2d')!;

    const virutalCanvas = document.createElement('canvas');
    virutalCanvas.width = canvasReference.width;
    virutalCanvas.height = canvasReference.height;
    this.virtualLayer = {
      canvas: virutalCanvas,
      context: virutalCanvas.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D
    }

    const renderBufferCanvas = document.createElement('canvas');
    renderBufferCanvas.width = canvasReference.width;
    renderBufferCanvas.height = canvasReference.height;
    this.renderBuffer = {
      canvas: renderBufferCanvas,
      context: renderBufferCanvas.getContext('2d') as CanvasRenderingContext2D
    }

    const imgData = new ImageData(canvasReference.width, canvasReference.height);

    this.setCss();

    this.appState = appState;
    this.setTool(this.appState.selectedTool);
  }

  private getOffsetPoint(event: PointerEvent): Point {
    const rect = this.canvasReference.getBoundingClientRect();

    const mouse = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }

    // scale
    mouse.x = mouse.x * this.canvasReference.width / rect.width;
    mouse.y = mouse.y * this.canvasReference.height / rect.height;

    return Point.create(mouse.x, mouse.y);
  }

  private onPointerDown(event: PointerEvent) {
    event.preventDefault();

    // disable multitouch
    if (!event.isPrimary) return;

    const middleButton = (event.button === 1);

    if (middleButton === false) {
      this.mouseDown = true;
      const mouse = this.getOffsetPoint(event);

      if (this.selectedTool && this.selectedTool.type !== ToolType.HAND) {
        this.virtualLayer.context.clearRect(0,0,this.virtualLayer.canvas.width, this.virtualLayer.canvas.height);
        this.virtualLayer.context.putImageData(this.appState.layers.getLayer(this.appState.selectedLayer).render(), 0, 0);
        this.selectedTool.onPointerDown(mouse);
        this.renderLayers();
      }
    }
  }

  private onPointerUp(event: PointerEvent) {
    event.preventDefault();

    // disable multitouch
    if (!event.isPrimary) return;

    this.mouseDown = false;

    const mouse = this.getOffsetPoint(event);

    if (this.selectedTool && this.selectedTool.type !== ToolType.HAND) {
      this.selectedTool.onPointerUp(mouse);
      this.renderLayers();

      // set selected layer data
      const virtualLayerImageData = this.virtualLayer.context.getImageData(
        0, 0,
        this.virtualLayer.canvas.width, this.virtualLayer.canvas.height
      );
      this.appState.layers.setImageData(this.appState.selectedLayer, virtualLayerImageData);
    }

    // console.log(this.debugGetRgba(event));
  }

  private onPointerMove(event: PointerEvent) {
    event.preventDefault();

    // disable multitouch
    if (!event.isPrimary || !this.mouseDown) return;

    const mouse = this.getOffsetPoint(event);

    if (this.mouseDown && this.selectedTool && this.selectedTool.type !== ToolType.HAND) {
      this.selectedTool.onPointerMove(mouse);
      this.renderLayers();
    }
  }

  private async renderLayers() {
    // render all layers
    //this.context.clearRect(0, 0, this.canvasReference.width, this.canvasReference.height);
    this.appState.layers.getLayers().forEach((layer, index) => {

      const layerRendered = layer.render();
      // tempContext.clearRect(0,0,tempCanvas.width, tempCanvas.height);
      this.renderBuffer.context.putImageData(layerRendered, 0, 0);
      this.context.drawImage(this.renderBuffer.canvas, 0, 0);

      if (index === this.appState.selectedLayer)
        this.context.drawImage(this.virtualLayer.canvas, 0, 0);

    });
  }

  private debugGetRgba(event: PointerEvent) {
    let point = this.getOffsetPoint(event);
    let imgData = this.context.getImageData(0, 0, this.canvasReference.width, this.canvasReference.height);
    const red = Math.floor(point.y) * (imgData.width * 4) + Math.floor(point.x) * 4;
    const green = red + 1;
    const blue = red + 2;
    const alpha = red + 3;

    const rgba = {
      r: imgData.data[red],
      g: imgData.data[green],
      b: imgData.data[blue],
      a: imgData.data[alpha],
    }
    console.log(point, imgData, rgba);
  }

  private setCss() {

    // touch-action
    // https://stackoverflow.com/questions/48124372/pointermove-event-not-working-with-touch-why-not

    this.canvasReference.style.cssText = `
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALEAAACxABrSO9dQAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAAWklEQVRIS+3NoQ0AMAwDwe6/ZEdJycvkVRjmIwGvyGc+7gdZyNKBIEsHgiz7A1zhT8hClg4EWToQZNkf4Ap/QhaydCDI0oEgy/4AV/gTspClA0GWDgRZlgdmHkchNKbvgjVKAAAAAElFTkSuQmCC') repeat;
      image-rendering: optimizeSpeed;
      image-rendering: optimizeContrast;
      image-rendering: -webkit-optimize-contrast;
      image-rendering: crisp-edges;
      image-rendering: -moz-crisp-edges;
      image-rendering: -o-crisp-edges;
      image-rendering: -webkit-crisp-edges;
      image-rendering: pixelated;
      -ms-interpolation-mode: nearest-neighbor;
      cursor: ${this.styles.cursor};
      touch-action: none;
    `;
  }

  public mountEvents() {
    this.canvasReference.addEventListener('pointerdown', this.onPointerDown.bind(this));
    this.canvasReference.addEventListener('pointermove', this.onPointerMove.bind(this));
    this.canvasReference.addEventListener('pointerleave', this.onPointerUp.bind(this));
    window.addEventListener('pointerup', this.onPointerUp.bind(this));
  }

  public unmountEvents() {
    this.canvasReference.removeEventListener('pointerdown', this.onPointerDown.bind(this));
    this.canvasReference.removeEventListener('pointermove', this.onPointerMove.bind(this));
    this.canvasReference.removeEventListener('pointerleave', this.onPointerUp.bind(this));
    window.removeEventListener('pointerup', this.onPointerUp.bind(this));
  }

  public setCanvasReference(canvasReference: HTMLCanvasElement) {
    this.canvasReference = canvasReference;
    this.setCss();
  }

  public setTool(tool: ToolType) {
    this.selectedTool = createTool(tool, this.virtualLayer.context);
    const cursor = this.selectedTool?.cursorCss as string;
    this.canvasReference.style.cursor = cursor;

    switch (this.selectedTool?.type) {
      case ToolType.PEN:
        const color = this.selectedTool.getProperty('color') as ToolProperty;
        color.value = this.appState.primaryColor;
        this.selectedTool.setProperty('color', color);
        break;

      default:
        break;
    }
  }

  public setAppState(appState: AppState) {
    this.appState = appState;
    this.setTool(appState.selectedTool);
  }
}
