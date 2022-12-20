import Point2D from "./entities/Point2D";
import { ViewChild } from "./ViewChild";

export default class CanvasView {

  private containerReference: HTMLDivElement;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private child: ViewChild | undefined;

  private scale: number = 1;
  private isDragging: boolean = false;
  private dragStartPosition: DOMPoint = new DOMPoint(0, 0);
  private currentTransformedCursor: DOMPoint = new DOMPoint(0, 0);

  constructor(containerReference: HTMLDivElement) {
    this.containerReference = containerReference;

    const canvas = document.createElement('canvas');
    canvas.width = containerReference.offsetWidth;
    canvas.height = containerReference.offsetHeight;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.setAttribute('style', `
      width: 100%;
      heigh: 100%;
      image-rendering: -moz-crisp-edges;
      image-rendering: -moz-crisp-edges;
      image-rendering: -o-crisp-edges;
      image-rendering: -webkit-optimize-contrast;
      -ms-interpolation-mode: nearest-neighbor;
    `);

    this.canvas = canvas;
    this.containerReference.innerHTML = "";
    this.containerReference.append(this.canvas);

    const context = this.canvas.getContext('2d');
    if (!context)
      throw new Error("Get canvas context failed");

    this.context = context;

    this.requestDraw();
  }

  private getTransformedPoint(x: number, y: number) {
    const originalPoint = new DOMPoint(x, y);
    return this.context.getTransform().invertSelf().transformPoint(originalPoint);
  }

  private handlePointerDown(event: PointerEvent) {
    this.isDragging = true;
    this.dragStartPosition = this.getTransformedPoint(event.offsetX, event.offsetY);
  }

  private handlePointerMove(event: PointerEvent) {
    this.currentTransformedCursor = this.getTransformedPoint(event.offsetX, event.offsetY);

    if (this.isDragging) {
      this.context.translate(this.currentTransformedCursor.x - this.dragStartPosition.x, this.currentTransformedCursor.y - this.dragStartPosition.y);
      this.requestDraw();
    }
  }

  private handlePointerUp(event: PointerEvent) {
    this.isDragging = false;
  }

  private handleWheel(event: WheelEvent) {
    const zoom = event.deltaY < 0 ? 1.1 : 0.9;

    this.context.translate(this.currentTransformedCursor.x, this.currentTransformedCursor.y);
    this.context.scale(zoom, zoom);
    this.context.translate(-this.currentTransformedCursor.x, -this.currentTransformedCursor.y);

    this.requestDraw();

    const matrix = this.context.getTransform();
    this.scale = matrix.a; // scaleX: matrix.a, scaleY: matrix.d

    event.preventDefault();
  }

  private drawGrid() {
    const ctx = this.context;

    const position = this.child!.getPosition();
    const size = this.child!.getSize();

    if (this.scale < 10)
      return;

    const scale = Math.floor(this.scale);
    const bw = size.width; // this.canvas.width;
    const bh = size.height; // this.canvas.height;
    const lw = 1/this.scale; // box border
    const boxRow = Math.floor(bw / 1); // how many boxes
    const box = bw / boxRow;   // box size

    ctx.lineWidth = lw;
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.2)';

    for (let x=0;x<bw;x+=box)
    {
      for (let y=0;y<bh;y+=box)
      {
        ctx.strokeRect(x,y,box,box);
      }
    }

    ctx.restore();
  }

  private draw() {
    const ctx = this.context;
    ctx.imageSmoothingEnabled = false;

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.restore();

    if (this.child) {
      const position = this.child.getPosition();
      const size = this.child.getSize();
      ctx.drawImage(this.child.getRenderedView(), position.x, position.y, size.width, size.height);
    }

    // this.drawGrid();
  }

  private requestDraw() {
    requestAnimationFrame(this.draw.bind(this));
  }

  private resize() {
    this.canvas.width = this.containerReference.offsetWidth;
    this.canvas.height = this.containerReference.offsetHeight;
    this.requestDraw();
  }

  private getMultitouch(): Array<number> | undefined {
    return undefined;
  }

  public setContainerReference(containerReference: HTMLDivElement): void | Error {
    const canvas = document.createElement('canvas');
    canvas.width = containerReference.offsetWidth;
    canvas.height = containerReference.offsetHeight;

    this.canvas = canvas;

    const context = this.canvas.getContext('2d');
    if (!context)
      throw new Error("Get canvas context failed");

    this.context = context;

    this.requestDraw();
  }

  public mountEvents() {
    window.addEventListener('resize', this.resize.bind(this));
    this.canvas.addEventListener('pointerdown', this.handlePointerDown.bind(this));
    this.canvas.addEventListener('pointermove', this.handlePointerMove.bind(this));
    this.canvas.addEventListener('pointerup', this.handlePointerUp.bind(this));
    this.canvas.addEventListener('wheel', this.handleWheel.bind(this));
  }

  public unmountEvents() {
    window.removeEventListener('resize', this.resize.bind(this));
    this.canvas.removeEventListener('pointerdown', this.handlePointerDown.bind(this));
    this.canvas.removeEventListener('pointermove', this.handlePointerMove.bind(this));
    this.canvas.removeEventListener('pointerup', this.handlePointerUp.bind(this));
    this.canvas.removeEventListener('wheel', this.handleWheel.bind(this));
  }

  public setChild(child: ViewChild) {
    this.child = child;
  }
}
