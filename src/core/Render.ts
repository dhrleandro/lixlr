import { AppState } from "./AppState";
import Layer from "./entities/Layer";
import LayerManager from "./LayerManager";

export interface CanvasContext {
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D
}

interface LayersRenderedCache {
  renderedBottomLayersCache: CanvasContext;
  renderedTopLayersCache: CanvasContext;
}

export default class Render {

  private width: number;
  private height: number;
  private renderBackBuffer: CanvasContext;
  private lastSelectedLayer: number | undefined = undefined;

  /**
   * A ideia desses dois caches é evitar de ter que renderizar todas as camadas durante
   * o uso de uma ferramenta de desenho, ou seja, desenhando um pixel, uma linha etc.
   * Os desenhos sao feitos em um buffer (camada virtual) para mostrar como será o resultado,
   * e para isso é necessário dois caches quando a camada virtual estiver entre duas camadas.
   * O cache renderedBottomLayersCache é o cache de desenho do agrupamento das camadas abaixo
   * da camada virtual.
   * O cache renderedTopLayersCache é o cache de desenho do agrupamento das camadas acima
   * da camada virtual.
   */
  private layersRenderedCache: LayersRenderedCache | undefined = undefined;
  private virtualLayer: CanvasContext;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.renderBackBuffer = this.createCanvas(width, height);
    this.virtualLayer = this.createCanvas(width, height);
    this.layersRenderedCache = undefined;
  }

  private createCanvas(width: number, height: number): CanvasContext {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return {
      canvas: canvas,
      context: canvas.getContext('2d') as CanvasRenderingContext2D
    }
  }

  public debugDownloadCanvas(canvas: HTMLCanvasElement) {
    const link = document.createElement('a');
    link.download = 'filename.png';
    link.href = canvas.toDataURL()
    link.click();
  }

  private buildLayersCache(appState: Readonly<AppState>): LayersRenderedCache {
    const layersRenderedCache = {
      renderedBottomLayersCache: this.createCanvas(this.width, this.height),
      renderedTopLayersCache: this.createCanvas(this.width, this.height),
    };

    // render all layers
    appState.layers.getLayers().forEach((layer) => {

      if (layer.isVisible() === false) return;

      const layerRendered = layer.render();
      this.renderBackBuffer.context.putImageData(layerRendered, 0, 0);

      if (layer.getId() <= appState.selectedLayer) {
        layersRenderedCache.renderedBottomLayersCache.context.drawImage(this.renderBackBuffer.canvas, 0, 0);
      } else {
        layersRenderedCache.renderedTopLayersCache.context.drawImage(this.renderBackBuffer.canvas, 0, 0);
      }
    });

    // this.debugDownloadCanvas(layersRenderedCache.renderedBottomLayersCache.canvas);
    // this.debugDownloadCanvas(layersRenderedCache.renderedTopLayersCache.canvas);
    return layersRenderedCache;
  }

  public async renderLayers(appState: Readonly<AppState>, mainContext: CanvasRenderingContext2D, rebuildCache: boolean = false) {

    if (this.layersRenderedCache === undefined || appState.selectedLayer !== this.lastSelectedLayer || rebuildCache) {
      this.lastSelectedLayer = appState.selectedLayer;
      this.layersRenderedCache = this.buildLayersCache(appState);
    }

    mainContext.clearRect(0, 0, mainContext.canvas.width, mainContext.canvas.height);
    mainContext.drawImage(this.layersRenderedCache.renderedBottomLayersCache.canvas, 0, 0);
    mainContext.drawImage(this.virtualLayer.canvas, 0, 0);
    mainContext.drawImage(this.layersRenderedCache.renderedTopLayersCache.canvas, 0, 0);
  }

  public getVirtualLayer(): CanvasContext {
    return this.virtualLayer;
  }

  public renderVirtualLayerInLayer(layer: Layer, virtualLayer: CanvasContext): Layer {
    const buffer = this.createCanvas(layer.data.width, layer.data.height);
    const canvas = buffer.canvas;
    const context = buffer.context;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.putImageData(layer.render(), 0, 0);
    context.drawImage(virtualLayer.canvas, 0, 0);
    virtualLayer.context.clearRect(0, 0, virtualLayer.canvas.width, virtualLayer.canvas.height);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const newLayer = new Layer(imageData, 0, '', canvas.width, canvas.height);
    // this.debugDownloadCanvas(canvas);
    return newLayer;
  }
}
