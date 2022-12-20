import Point2D from "./entities/Point2D";
import Rect2D from "./entities/Rect2D";

export interface ViewChild {
  getPosition(): Point2D;
  setPosition(position: Point2D): void;
  getSize(): Rect2D;
  setSize(size: Rect2D): void;
  getRenderedView(): HTMLCanvasElement;
  handlePointerDown(event: PointerEvent): void;
  handlePointerMove(event: PointerEvent): void;
  handlePointerUp(event: PointerEvent): void;
}

export abstract class BaseViewChild implements ViewChild {

  protected position: Point2D = Point2D.create(0, 0);
  protected size: Rect2D = Rect2D.create(120, 16);
  protected canvas: HTMLCanvasElement;
  protected needRedraw: boolean = true;

  constructor(position?: Point2D, size?: Rect2D) {
    if (position)
      this.setPosition(position);

    if (size)
      this.setSize(size);

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.size.width;
    this.canvas.height = this.size.height;
  }

  protected abstract draw(): void;

  protected getContext(): CanvasRenderingContext2D {
    const context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    return context;
  }

  public getPosition(): Point2D {
    return this.position;
  }

  public setPosition(position: Point2D): void {
    this.position = position;
  }

  public getSize(): Rect2D {
    return this.size;
  }

  public setSize(size: Rect2D): void {
    this.size = size;
  }

  public getRenderedView(): HTMLCanvasElement {
    if (this.needRedraw) {
      this.draw();
      this.needRedraw = false;
    }

    return this.canvas;
  }

  public handlePointerDown(event: PointerEvent): void {

  }

  public handlePointerMove(event: PointerEvent): void {

  }

  public handlePointerUp(event: PointerEvent): void {

  }
}
