import Layer from "./entities/Layer";
import Point2D from "./entities/Point2D";
import Rect2D from "./entities/Rect2D";
import { State } from "./state/State";
import { Tool } from "./tools/Tool";
import { BaseViewChild } from "./ViewChild";

export default class PixelEditor extends BaseViewChild {

  private gridCacheHighZoom: HTMLCanvasElement | undefined;
  private gridCacheLowZoom: HTMLCanvasElement | undefined;

  private mouseDown: boolean = false;

  constructor(position?: Point2D, size?: Rect2D) {
    super(position, size);
  }

  private drawGridHighZoom(ctx: CanvasRenderingContext2D) {

    if (!this.gridCacheHighZoom) {
      this.gridCacheHighZoom = document.createElement('canvas');
      this.gridCacheHighZoom.width = this.size.width;
      this.gridCacheHighZoom.height = this.size.height;

      const color = [
        '#CCCCCC',
        '#FFFFFF'
      ];

      const gridCtx = this.gridCacheHighZoom.getContext('2d') as CanvasRenderingContext2D;
      for (let y = 0; y < this.size.height; y++) {

        let par = (y % 2) === 0 ? true : false;
        let fristColor = (y % 2) === 0 ? 0 : 1;
        let secondColor = (fristColor === 0) ? 1 : 0;

        for (let x = 0; x < this.size.width; x++) {

          let colorId = (x % 2) === 0 ? fristColor : secondColor;
          gridCtx.fillStyle = color[colorId];
          gridCtx.fillRect(x, y, 1, 1);

        }

      }
    }

    ctx.drawImage(this.gridCacheHighZoom, 0, 0);
  }

  private drawGridLowZoom(ctx: CanvasRenderingContext2D) {

    if (!this.gridCacheLowZoom) {
      this.gridCacheLowZoom = document.createElement('canvas');
      this.gridCacheLowZoom.width = this.size.width;
      this.gridCacheLowZoom.height = this.size.height;

      const color = [
        '#CCCCCC',
        '#FFFFFF'
      ];

      const gridCtx = this.gridCacheLowZoom.getContext('2d') as CanvasRenderingContext2D;
      const size = 8;
      const boxH = this.size.height / size;
      const boxW = this.size.width / size;

      for (let y = 0; y < boxH; y++) {

        let par = (y % 2) === 0 ? true : false;
        let fristColor = (y % 2) === 0 ? 0 : 1;
        let secondColor = (fristColor === 0) ? 1 : 0;

        for (let x = 0; x < boxW; x++) {

          let colorId = (x % 2) === 0 ? fristColor : secondColor;
          gridCtx.fillStyle = color[colorId];
          gridCtx.fillRect(x*size, y*size, size, size);

        }

      }
    }

    ctx.drawImage(this.gridCacheLowZoom, 0, 0);
  }

  protected draw(appState?: Readonly<State>) {
    const ctx = this.getContext();
    ctx.clearRect(0, 0, this.size.width, this.size.height);

    if (appState && appState.scale < 5) {
      this.drawGridLowZoom(ctx);
    } else {
      this.drawGridHighZoom(ctx);
    }

    // draw layers
    if (appState) {
      appState.layerManager.getLayers().forEach(layer => {
        ctx.drawImage(layer.canvas, 0, 0);
      });
    }
  }


  private globalToLocalCoordinates(point: Point2D): Point2D {
    const rect = this.getSize();
    const pos = this.getPosition();

    const mouse = {
      x: point.x - pos.x,
      y: point.y - pos.y
    }

    return Point2D.create(mouse.x, mouse.y);
  }

  private getLayerContext(state?: Readonly<State>): CanvasRenderingContext2D | undefined {
    if (state) {
      return state.layerManager.getLayer(state.selectedLayerId).context;
    }

    return undefined;
  }


  public setSize(size: Rect2D): void {
    this.size = size;
    this.gridCacheHighZoom = undefined;
    this.gridCacheLowZoom = undefined;
  }

  public handlePointerDown(point: Point2D, tool?: Tool, state?: Readonly<State>): void {
    this.mouseDown = true;

    const mouse = this.globalToLocalCoordinates(point);
    const ctx = this.getLayerContext(state)
    if (ctx)
      tool?.onPointerDown(mouse, ctx);
  }

  public handlePointerMove(point: Point2D, tool?: Tool, state?: Readonly<State>): void {
    if (this.mouseDown) {
      const mouse = this.globalToLocalCoordinates(point);
      const ctx = this.getLayerContext(state)
      if (ctx)
        tool?.onPointerMove(mouse, ctx);
    }
  }

  public handlePointerUp(point: Point2D, tool?: Tool, state?: Readonly<State>): void {
    this.mouseDown = false;
    const mouse = this.globalToLocalCoordinates(point);
    const ctx = this.getLayerContext(state)
    if (ctx)
      tool?.onPointerUp(mouse, ctx);
  }
}
