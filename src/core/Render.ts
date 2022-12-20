import { AppState } from "./AppState";
import LayerManager from "./LayerManager";

interface CanvasContext {
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D
}

interface LayersRenderedCache {
  renderedBottomLayersCache: CanvasContext;
  renderedTopLayersCache: CanvasContext;
}

export default class Render {

  private renderBackBuffer: CanvasContext;

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

  private buildLayersCache(appState: Readonly<AppState>): layersRenderedCache {
    this.layersRenderedCache = {
      renderedBottomLayersCache: this.createCanvas(width, height),
      renderedTopLayersCache: this.createCanvas(width, height),
    };

    // render all layers
    appState.layers.getLayers().forEach((layer, index) => {
      const layerRendered = layer.render();
      this.renderBackBuffer.context.putImageData(layerRendered, 0, 0);

      if (index === appState.selectedLayer)
        mainContext.drawImage(this.virtualLayer.canvas, 0, 0);

    });
  }

  public async renderLayers(appState: Readonly<AppState>, mainContext: CanvasRenderingContext2D) {
    // render all layers
    appState.layers.getLayers().forEach((layer, index) => {
      const layerRendered = layer.render();
      this.renderBackBuffer.context.putImageData(layerRendered, 0, 0);
      mainContext.drawImage(this.renderBackBuffer.canvas, 0, 0);

      if (index === appState.selectedLayer)
        mainContext.drawImage(this.virtualLayer.canvas, 0, 0);

    });
  }

}
