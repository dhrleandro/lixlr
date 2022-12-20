import ColorRgba from "./ColorRgba";

export default class Pixel {

  public x: number;
  public y: number;
  private color: ColorRgba;

  constructor(x: number, y: number, red: number, green: number, blue: number) {
    this.x = x;
    this.y = y;
    this.color = ColorRgba.create(red, green, blue);
  }

  public getColorRgba(): ColorRgba {
    return this.color;
  }

  public static create(x: number, y: number, red: number, green: number, blue: number): Pixel {
    return new Pixel(x, y, red, green, blue);
  }
}
