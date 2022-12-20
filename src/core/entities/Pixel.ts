import ColorRgb from "./ColorRgb";

export default class Pixel {

  public x: number;
  public y: number;
  private color: ColorRgb;

  constructor(x: number, y: number, red: number, green: number, blue: number) {
    this.x = x;
    this.y = y;
    this.color = ColorRgb.create(red, green, blue);
  }

  public getColorRgb(): ColorRgb {
    return this.color;
  }

  public static create(x: number, y: number, red: number, green: number, blue: number): Pixel {
    return new Pixel(x, y, red, green, blue);
  }
}
