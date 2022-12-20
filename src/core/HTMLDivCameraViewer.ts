import Point from "./entities/Point";

export type ScaleData = {
  scale: number;
}

export default class HTMLDivCameraViewer {

  private divReference: HTMLDivElement;
  private enableMousePan: boolean;
  private scale: number;
  private panning: boolean;
  private point: Point;
  private start: Point;
  private isMouseMiddleButtonPressing: boolean;

  public static readonly EVENT_CHANGED_SCALE = 'changedscale';

  constructor(divReference: HTMLDivElement) {

    this.divReference = divReference;
    this.enableMousePan = true;
    this.scale = 1;
    this.panning = false;
    this.point = Point.create(0, 0);
    this.start = Point.create(0, 0);
    this.isMouseMiddleButtonPressing = false;

    this.setCss();
    this.alignToCenter();
  }

  private setTransform() {
    this.divReference.style.transform = "translate(" + this.point.x + "px, " + this.point.y + "px) scale(" + this.scale + ")";
  }

  private onmousedown(event: PointerEvent) {
    event.preventDefault();

    // disable multitouch
    if (!event.isPrimary) return;

    // https://stackoverflow.com/questions/1795734/triggering-onclick-event-using-middle-click
    // https://www.w3.org/TR/pointerevents/#the-button-property
    this.isMouseMiddleButtonPressing = (event.button === 1);

    // permite mover se a ferramenta for 'move' ou se estiver usando a roda do mouse (que não interferirá no desenho)
    if (!this.enableMousePan && !this.isMouseMiddleButtonPressing) return;

    this.start = Point.create(
      event.clientX - this.point.x,
      event.clientY - this.point.y
    );

    this.panning = true;
  }

  private onmouseup(event: PointerEvent) {
    event.preventDefault();

    // disable multitouch
    if (!event.isPrimary) return;

    const middleButton = (event.button === 1);
    this.isMouseMiddleButtonPressing = false;

    if (!this.enableMousePan && !this.isMouseMiddleButtonPressing) return;

    this.panning = false;
  }

  private onmousemove(event: PointerEvent) {
    event.preventDefault();

    // disable multitouch
    if (!event.isPrimary) return;

    if (!this.enableMousePan && !this.isMouseMiddleButtonPressing) return;
    if (!this.panning) return;

    this.point = Point.create(
      (event.clientX - this.start.x),
      (event.clientY - this.start.y)
    );

    this.setTransform();
  }


  private onwheel(event: WheelEvent) {
    let xs = (event.clientX - this.point.x) / this.scale;
    let ys = (event.clientY - this.point.y) / this.scale;

    // https://github.com/Microsoft/TypeScript/issues/9071
    // let delta = event.wheelDelta ? event.wheelDelta : -event.deltaY;

    let delta = -event.deltaY;

    if (delta > 0) {
      this.scale = this.scale * 1.2;
    } else {
      this.scale = this.scale / 1.2;
    }

    this.point = Point.create(
      event.clientX - xs * this.scale,
      event.clientY - ys * this.scale
    );

    this.setTransform();

    const changedScaleEvent = this.createChangedScaleEvent();
    this.divReference.dispatchEvent(changedScaleEvent);
  }

  private setCss() {
    this.divReference.style.display = 'inline-block';
    this.divReference.style.position = 'relative';
    this.divReference.style.overflow = 'hidden';
    this.divReference.style.padding = '0';
    this.divReference.style.margin = '0';
    this.divReference.style.transformOrigin = '0px 0px';
    // this.divReference.style.transform = 'scale(1) translate(0px, 0px)';

    // https://stackoverflow.com/questions/48124372/pointermove-event-not-working-with-touch-why-not
    this.divReference.style.touchAction = 'none';
  }

  private createChangedScaleEvent(): CustomEvent<ScaleData> {
    const scale: ScaleData = {
      scale: this.scale
    }

    const eventChangedScale = new CustomEvent<ScaleData>(
      HTMLDivCameraViewer.EVENT_CHANGED_SCALE,
      {
        bubbles: true,
        detail: scale
      }
    );

    return eventChangedScale;
  }

  public alignToCenter() {
    const rect = this.divReference.getBoundingClientRect();

    this.point = Point.create(
      (window.innerWidth / 2) - rect.width / 2,
      (window.innerHeight / 2) - rect.height / 2
    );

    this.setTransform();
  }

  public mountEvents() {
    window.addEventListener('pointerdown', this.onmousedown.bind(this));
    window.addEventListener('pointerup', this.onmouseup.bind(this));
    window.addEventListener('pointermove', this.onmousemove.bind(this));
    window.addEventListener('wheel', this.onwheel.bind(this));
  }

  public unmountEvents() {
    window.removeEventListener('pointerdown', this.onmousedown.bind(this));
    window.removeEventListener('pointerup', this.onmouseup.bind(this));
    window.removeEventListener('pointermove', this.onmousemove.bind(this));
    window.removeEventListener('wheel', this.onwheel.bind(this));
  }

  public setDivReference(divReference: HTMLDivElement) {
    this.divReference = divReference;
    this.setCss();
  }

  public setEnableMousePan(enable: boolean) {
    this.enableMousePan = enable;
  }

  public setScale(scale: number) {
    this.scale = scale;
    this.setTransform();
  }
}
