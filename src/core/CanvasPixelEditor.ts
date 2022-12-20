// import { Tool, ToolType } from "./entities/Tool";
import { Tool } from "./tools/Tool";
import Point from "./entities/Point";
import { ToolType } from "./tools/Type";
import { createTool } from "./tools/Factory";
import { AppState } from "./AppState";
import { ToolProperty } from "./tools/Property";
import Render, { CanvasContext } from "./Render";
import { isThisTypeNode } from "typescript";

export default class CanvasPixelEditor {

  private canvasReference: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  private virtualLayer: CanvasContext;

  private selectedTool: Tool | undefined;
  private styles = {
    cursor: 'default'
  };

  private appState: AppState;

  private mouseDown: boolean = false;

  private render: Render;

  constructor(canvasReference: HTMLCanvasElement, appState: AppState) {
    this.canvasReference = canvasReference;
    this.context = this.canvasReference.getContext('2d')!;

    this.setCss();

    this.render = new Render(this.canvasReference.width, this.canvasReference.height);
    this.virtualLayer = this.render.getVirtualLayer();

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
        this.selectedTool.onPointerDown(mouse);
        this.render.renderLayers(this.appState, this.context);
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

      const oldLayer = this.appState.layers.getLayer(this.appState.selectedLayer);
      const newLayer = this.render.renderVirtualLayerInLayer(oldLayer, this.virtualLayer);
      this.appState.layers.setImageData(this.appState.selectedLayer, newLayer.render());
    }

    this.virtualLayer.context.clearRect(0, 0, this.virtualLayer.canvas.width, this.virtualLayer.canvas.height);
    this.render.renderLayers(this.appState, this.context, true);
  }

  private onPointerMove(event: PointerEvent) {
    event.preventDefault();

    // disable multitouch
    if (!event.isPrimary || !this.mouseDown) return;

    const mouse = this.getOffsetPoint(event);

    if (this.mouseDown && this.selectedTool && this.selectedTool.type !== ToolType.HAND) {
      this.selectedTool.onPointerMove(mouse);
      this.render.renderLayers(this.appState, this.context);
    }
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
    // this.canvasReference.addEventListener('pointerleave', this.onPointerUp.bind(this));
    window.addEventListener('pointerup', this.onPointerUp.bind(this));
  }

  public unmountEvents() {
    this.canvasReference.removeEventListener('pointerdown', this.onPointerDown.bind(this));
    this.canvasReference.removeEventListener('pointermove', this.onPointerMove.bind(this));
    // this.canvasReference.removeEventListener('pointerleave', this.onPointerUp.bind(this));
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
      case ToolType.BRUSH:
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
    this.render.renderLayers(appState, this.context, true);
  }
}
