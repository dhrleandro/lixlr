import Point2D from "./Point2D";
import RGBA from "./RGBA";

export default class Layer {

  private offscreenCanvas: HTMLCanvasElement;
  private visible: boolean;
  private name: string;
  private id: number;

  constructor(name: string, width: number, height: number, visible: boolean = true) {
    this.visible = visible;
    this.name = name;
    this.id = Date.now();
    this.offscreenCanvas = document.createElement('canvas');
    this.offscreenCanvas.width = width;
    this.offscreenCanvas.height = height;
  }

  get canvas(): HTMLCanvasElement {
    return this.offscreenCanvas;
  }

  get context(): CanvasRenderingContext2D {
    return this.offscreenCanvas.getContext('2d') as CanvasRenderingContext2D;
  }

  public setVisible(visible: boolean) {
    this.visible = visible;
  }

  public isVisible(): boolean {
    return this.visible;
  }

  public getName(): string {
    return this.name;
  }

  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }
}
