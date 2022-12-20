export default abstract class View {

  private containerReference: HTMLDivElement;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private child: View | undefined;

  constructor(containerReference: HTMLDivElement) {
    this.containerReference = containerReference;

    const canvas = document.createElement('canvas');
    canvas.width = containerReference.offsetWidth;
    canvas.height = containerReference.offsetHeight;
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    this.canvas = canvas;
    this.containerReference.innerHTML = "";
    this.containerReference.append(this.canvas);

    const context = this.canvas.getContext('2d');
    if (!context)
      throw new Error("Get canvas context failed");

    this.context = context;
  }

  private resize() {
    this.canvas.width = this.containerReference.offsetWidth;
    this.canvas.height = this.containerReference.offsetHeight;
  }

  private getMultitouch(): Array<number> | undefined {
    return undefined;
  }

  private handlePointerStart(event: PointerEvent) {

  }

  private handlePointerMove(event: PointerEvent) {

  }

  private handlePointerEnd(event: PointerEvent) {

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
  }

  public mountEvents() {
    window.addEventListener('resize', this.resize.bind(this));
  }

  public unmountEvents() {
    window.removeEventListener('resize', this.resize.bind(this));
  }
}
