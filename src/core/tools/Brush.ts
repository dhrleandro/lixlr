import RGBA from "../entities/RGBA";
import Point2D from "../entities/Point2D";
import { BaseTool } from "./Tool";
import { ToolType } from "./ToolType";
import { putPixel, circlePoints, floodFill, drawLinePoints } from "../utils/graphic";
import { ToolProperty, ToolPropertyType } from "./Property";

interface BrushConfig {
  canvas: HTMLCanvasElement,
  halfSize: number
}

export default class Brush extends BaseTool {

  public readonly type = ToolType.BRUSH;
  public readonly cursorCss: string = 'crosshair';
  private lastPoint: Point2D;
  private paintStart: boolean;

  private readonly PROP_COLOR = 'color';
  private color: RGBA;

  private readonly PROP_SIZE = 'size';
  private size: number = 10;

  private brush: BrushConfig | undefined = undefined;

  constructor() {
    super();

    this.lastPoint = Point2D.create(0,0);
    this.paintStart = false;

    this.color = RGBA.create(0,0,0);

    this.addColorProperty(this.PROP_COLOR, RGBA.create(0,0,0));
    this.addNumberProperty(this.PROP_SIZE, 10);

    this.createBrush();
  }

  private createBrush() {
    this.color = this.getProperty('color')?.value as RGBA;
    this.size = this.getProperty('size')?.value as number;

    const canvas = document.createElement('canvas');

    const radius = this.size;
    const diameter = (radius*2)+5; // 5px safety margin
    canvas.width = diameter;
    canvas.height = diameter;

    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    // debug rectangle
    // ctx.fillStyle = 'red';
    // ctx.fillRect(0,0,canvas.width,canvas.height);
    // const linePoints = [
    //   ...drawLinePoints(0, 0, canvas.width-1, 0),
    //   ...drawLinePoints(0, 0, 0, canvas.height-1),
    //   ...drawLinePoints(0, canvas.height-1, canvas.width-1, canvas.height-1),
    //   ...drawLinePoints(canvas.width-1, canvas.height-1, canvas.width-1, 0),
    // ]
    // linePoints.forEach(item => {
    //   putPixel(item.x, item.y, ctx, this.color);
    // });


    const center = Point2D.create(
      Math.floor(canvas.width/2),
      Math.floor(canvas.height/2)
    );

    const circle = circlePoints(center.x, center.y, radius);
    circle.forEach(item => {
      putPixel(item.x, item.y, ctx, this.color);
    });
    floodFill(ctx, center.x, center.y, this.color);

    const brushConfig: BrushConfig = {
      canvas: canvas,
      halfSize: diameter/2
    }
    this.brush = brushConfig;
  }

  private drawFilledCircle(context: CanvasRenderingContext2D, point: Point2D): void {
    if (!this.brush)
      this.createBrush();

    context.drawImage(
      this.brush!.canvas,
      Math.floor(point.x - this.brush!.halfSize),
      Math.floor(point.y - this.brush!.halfSize)
    );
  }

  private putPoints(points: Point2D[], context: CanvasRenderingContext2D) {
    points.forEach(point => {
      this.drawFilledCircle(context, point);
    });
  }

  public onPointerDown(point: Point2D, context: CanvasRenderingContext2D): void {
    this.createBrush();
    this.paintStart = true;
    this.lastPoint = point;
    this.color = this.getProperty('color')?.value as RGBA;
    this.size = this.getProperty('size')?.value as number;

    context.save();
    this.drawFilledCircle(context, point);
  }

  public onPointerMove(point: Point2D, context: CanvasRenderingContext2D): void {

    if (!this.paintStart) return;

    const last = this.lastPoint;

    if (Math.abs(point.x-last.x) > 1 || Math.abs(point.y-last.y) > 1) {
      const linePoints = drawLinePoints(last.x, last.y, point.x, point.y);
      this.putPoints(linePoints, context);
    } else {
      this.drawFilledCircle(context, point);
    }

    this.lastPoint = point;
  }

  public onPointerUp(point: Point2D, context: CanvasRenderingContext2D): void {
    this.paintStart = false;
    this.lastPoint = point;
    context.restore();
  }

  // override abstract class Tool.setProperty()
  // public setProperty(name: string, value: ToolProperty): void {

  //   if (this.getProperty(name) === value)
  //     return;

  //   console.log('change '+name)
  //   // call abstract class Tool.setProperty()
  //   super.setProperty(name, value);

  //   // create a new brush on properties changed
  //   if (name === this.PROP_SIZE)
  //     this.createBrush();
  // }
}
