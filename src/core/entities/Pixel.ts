import ColorRgba from "./ColorRgba";

export default class Pixel {

  public x: number;
  public y: number;
  private color: ColorRgba;

  constructor(x: number, y: number, red: number = 0, green: number = 0, blue: number = 0, alpha: number = 0) {
    this.x = x;
    this.y = y;
    this.color = ColorRgba.create(red, green, blue, alpha);
  }

  public getColorRgba(): ColorRgba {
    return this.color;
  }

  public static create(x: number, y: number, red: number, green: number, blue: number): Pixel {
    return new Pixel(x, y, red, green, blue);
  }

  public static createWidthRgba(x: number, y: number, rgba: ColorRgba): Pixel {
    return new Pixel(x, y, rgba.red, rgba.green, rgba.blue, rgba.alpha);
  }
}
