import RGBA from "../entities/RGBA";
import Point2D from "../entities/Point2D";
import { ToolProperty, ToolPropertyType, createToolProperty } from "./Property";
import { ToolType } from "./ToolType";

export interface Tool {
  readonly cursorCss: string;
  readonly type: ToolType | undefined;

  getProperty(name: string): ToolProperty | undefined;
  setProperty(name: string, value: ToolProperty): void;
  getToolProperties(): Map<string, ToolProperty>;
  addTextProperty(name: string, value: string): void | Error;
  addNumberProperty(name: string, value: number): void | Error;
  addColorProperty(name: string, value: RGBA): void | Error;
  // addBrushProperty(name: string, value: Brush): void | Error;

  setCanvasContext(context: CanvasRenderingContext2D): void;

  onPointerDown(point: Point2D): void;
  onPointerUp(point: Point2D): void;
  onPointerMove(point: Point2D): void;
}

export abstract class BaseTool implements Tool {

  // properties information for UI settings<ToolProperty>
  private properties: Map<string, ToolProperty>;

  protected context: CanvasRenderingContext2D;
  public readonly cursorCss: string = 'default';
  public readonly type: ToolType | undefined = undefined;

  constructor(context: CanvasRenderingContext2D) {
    this.properties = new Map<string, ToolProperty>;
    this.context = context;
  }

  private addProperty(name: string, value: ToolProperty): void | Error {
    if (this.properties.get(name) !== undefined)
      throw new Error(`Property ${name} already exists`);

    this.setProperty(name, value);
  }

  public getProperty(name: string): ToolProperty | undefined {
    return this.properties.get(name);
  }

  public setProperty(name: string, value: ToolProperty): void {
    this.properties.set(name, value);
  }

  public addTextProperty(name: string, value: string): void | Error {
    try {
      const property = createToolProperty(ToolPropertyType.TEXT, value);
      this.addProperty(name, property);
    } catch(e) {
      return e as Error;
    }
  }

  addNumberProperty(name: string, value: number): void | Error {
    try {
      const property = createToolProperty(ToolPropertyType.NUMBER, value);
      this.addProperty(name, property);
    } catch(e) {
      return e as Error;
    }
  }

  addColorProperty(name: string, value: RGBA): void | Error {
    try {
      const property = createToolProperty(ToolPropertyType.COLOR, value);
      this.addProperty(name, property);
    } catch(e) {
      return e as Error;
    }
  }

  public getToolProperties(): Map<string, ToolProperty> {
    return this.properties;
  }

  public setCanvasContext(context: CanvasRenderingContext2D) {
    this.context = context;
  }

  public abstract onPointerDown(point: Point2D): void;
  public abstract onPointerUp(point: Point2D): void;
  public abstract onPointerMove(point: Point2D): void;
}
