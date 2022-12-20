/**
 * Leandro Daher, 2022
 *
 * Reference:
 * https://roblouie.com/article/617/transforming-mouse-coordinates-to-canvas-coordinates/
 */

import AbstractStateObserver from "./state/AbstractStateObserver";
import { Subject } from "./state/SubjectObserver";
import { ViewChild } from "./ViewChild";
import { ActionType } from "./state/Store";
import Point2D from "./entities/Point2D";
import Rect2D from "./entities/Rect2D";
import { hitTest } from "./utils/math";
import { ToolType } from "./tools/ToolType";
import { Tool } from "./tools/Tool";
import Factory from "./tools/Factory";
import { ToolProperty } from "./tools/Property";
import PinchGesture from "./utils/PinchGesture";

export default class CanvasView extends AbstractStateObserver {

  private containerReference: HTMLDivElement;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private child: ViewChild | undefined;

  private isDragging: boolean = false;
  private dragStartPosition: DOMPoint = new DOMPoint(0, 0);
  private currentTransformedCursor: DOMPoint = new DOMPoint(0, 0);

  private toolState: Tool | undefined;

  private pinchGesture: PinchGesture;
  private isMakingPinchGesture: boolean = false;

  constructor(containerReference: HTMLDivElement, stateManager: Subject) {
    super(stateManager);
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

    this.pinchGesture = new PinchGesture(this.containerReference, this.handlePinchIn.bind(this), this.handlePinchOut.bind(this));
  }

  // get containerDiv browser mouse coordinates
  // equivalent of event.offsetX and  event.offsetY
  private getOffsetPoint(event: PointerEvent): Point2D {
    const rect = this.containerReference.getBoundingClientRect();

    const mouse = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }

    return Point2D.create(mouse.x, mouse.y);
  }

  // verify if point is inside of this.child
  private pointHitChild(event: PointerEvent): boolean {
    if (!this.child)
      return false;

    // get mouse coordinates considering canvas transformation matrix
    const offset = this.getOffsetPoint(event);
    const currentTransformedCursor = this.getTransformedPoint(offset.x, offset.y);

    return hitTest(currentTransformedCursor, this.child.getPosition(), this.child.getSize());
  }

  // trasnform mouse coordinates to canvas trasnform
  private getTransformedPoint(x: number, y: number) {
    const originalPoint = new DOMPoint(x, y);
    return this.context.getTransform().invertSelf().transformPoint(originalPoint);
  }

  private handlePointerDown(event: PointerEvent): void {
    if (this.pinchGesture.getCountOfPoints() > 1 || this.isMakingPinchGesture)
      return;

    const middleButton = (event.button === 1); // pressing mouse scroll wheel

    // if have more of one touch point and this is not the first point
    if (!event.isPrimary)
      return;

    if (
      middleButton ||
      (this.state && this.state.selectedTool == ToolType.HAND)
    ){
      this.isDragging = true;
      const offset = this.getOffsetPoint(event);
      this.dragStartPosition = this.getTransformedPoint(offset.x, offset.y);
      return;
    }

    if (this.pointHitChild(event)) {
      const offset = this.getOffsetPoint(event);
      const currentTransformedCursor = this.getTransformedPoint(offset.x, offset.y);
      this.child?.handlePointerDown(currentTransformedCursor, this.toolState, this.state);
    }

    this.requestDraw();
  }

  private handlePointerMove(event: PointerEvent): void {
    if (this.pinchGesture.getCountOfPoints() > 1 || this.isMakingPinchGesture)
      return;

    const offset = this.getOffsetPoint(event);
    this.currentTransformedCursor = this.getTransformedPoint(offset.x, offset.y);

    // if have more of one touch point and this is not the first point
    if (!event.isPrimary)
      return;

    if (this.isDragging) {
      this.context.translate(this.currentTransformedCursor.x - this.dragStartPosition.x, this.currentTransformedCursor.y - this.dragStartPosition.y);
      this.requestDraw();
      return;
    }

    if (this.pointHitChild(event))
      this.child?.handlePointerMove(this.currentTransformedCursor, this.toolState, this.state);

    this.requestDraw();
  }

  private handlePointerUp(event: PointerEvent): void {
    if (this.isDragging) {
      this.isDragging = false;
      return;
    }

    const offset = this.getOffsetPoint(event);
    const currentTransformedCursor = this.getTransformedPoint(offset.x, offset.y);
    this.child?.handlePointerUp(currentTransformedCursor, this.toolState, this.state);

    this.requestDraw();
  }

  private handleWheel(event: WheelEvent) {
    const zoom = event.deltaY < 0 ? 1.1 : 0.9;


    this.context.translate(this.currentTransformedCursor.x, this.currentTransformedCursor.y);
    this.context.scale(zoom, zoom);
    this.context.translate(-this.currentTransformedCursor.x, -this.currentTransformedCursor.y);

    this.requestDraw();

    const matrix = this.context.getTransform();
    this.stateManager?.updateState({
      type: ActionType.SET_ZOOM,
      value: matrix.a
    }); // scaleX: matrix.a, scaleY: matrix.d

    event.preventDefault();
  }

  private pinchZoom(zoom: number) {

    const childPosition = this.child?.getPosition();
    const childSize = this.child?.getSize();

    if (!childPosition || !childSize)
      return;

    const center = Point2D.create(
      childPosition.x + childSize.width / 2,
      childPosition.y + childSize.height / 2
    );

    if (zoom < 1 && this.state!.scale < 1.01)
      return

    this.context.translate(center.x, center.y);
    this.context.scale(zoom, zoom);
    this.context.translate(-center.x, -center.y);

    this.requestDraw();
  }

  private handlePinchIn() {
    if (this.state?.selectedTool !== ToolType.HAND)
      return;

    this.isMakingPinchGesture = true;
    this.pinchZoom(1.05);

    setTimeout(() => {
      this.isMakingPinchGesture = false;
    }, 500);
  }

  private handlePinchOut() {
    if (this.state?.selectedTool !== ToolType.HAND)
      return;

    this.isMakingPinchGesture = true;
    this.pinchZoom(0.97);

    setTimeout(() => {
      this.isMakingPinchGesture = false;
    }, 500);
  }

  private drawGrid() {
    const ctx = this.context;

    const position = this.child!.getPosition();
    const size = this.child!.getSize();

    if (!this.stateManager)
      return;

    if (this.stateManager.state.scale < 10)
      return;

    const scale = Math.floor(this.stateManager.state.scale);
    const bw = size.width; // this.canvas.width;
    const bh = size.height; // this.canvas.height;
    const lw = 1/this.stateManager.state.scale; // box border
    const boxRow = Math.floor(bw / 1); // how many boxes
    const box = bw / boxRow;   // box size

    ctx.lineWidth = lw;
    ctx.strokeStyle = 'rgba(255, 0, 255, 1)';

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
      ctx.drawImage(this.child.getRenderedView(this.stateManager?.state), position.x, position.y, size.width, size.height);
    }

    // this.drawGrid();
  }

  private requestDraw() {
    requestAnimationFrame(this.draw.bind(this));
  }

  private resize() {
    const matrix = this.context.getTransform();
    this.canvas.width = this.containerReference.offsetWidth;
    this.canvas.height = this.containerReference.offsetHeight;
    this.context.setTransform(matrix);
    this.requestDraw();
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

    this.pinchGesture.mountEvents();
  }

  public unmountEvents() {
    window.removeEventListener('resize', this.resize.bind(this));
    this.canvas.removeEventListener('pointerdown', this.handlePointerDown.bind(this));
    this.canvas.removeEventListener('pointermove', this.handlePointerMove.bind(this));
    this.canvas.removeEventListener('pointerup', this.handlePointerUp.bind(this));
    this.canvas.removeEventListener('wheel', this.handleWheel.bind(this));

    this.pinchGesture.unmountEvents();
  }

  public setChild(child: ViewChild) {
    this.child = child;
  }

  private setTrasformMatrixScale(zoom: number) {

    const childPosition = this.child?.getPosition();
    const childSize = this.child?.getSize();

    if (!childPosition || !childSize)
      return;

    const center = Point2D.create(
      childPosition.x + childSize.width / 2,
      childPosition.y + childSize.height / 2
    );

    this.context.translate(center.x, center.y);
    const matrix = this.context.getTransform();
    matrix.a = zoom;
    matrix.d = zoom;
    this.context.setTransform(matrix);
    this.context.translate(-center.x, -center.y);

    this.requestDraw();
  }

  public update(stateManager: Subject): void {
    super.update(stateManager);

    // set tool
    this.toolState = Factory.createTool(this.state?.selectedTool);
    if (this.toolState) {
      const color = this.toolState?.getProperty('color');
      if (color) {
        color.value = stateManager.state.selectedColor;
        this.toolState?.setProperty('color', color);
      }

      const size = this.toolState?.getProperty('size');
      if (size) {
        size.value = stateManager.state.toolSize;
        this.toolState?.setProperty('size', size);
      }
    }

    this.canvas.style.cursor = this.toolState?.cursorCss || 'default';

    if (this.state)
      this.setTrasformMatrixScale(this.state.scale);

    this.requestDraw();
  }
}
