export default class ColorRgb {

  private rgb: Uint8ClampedArray;

  constructor(red: number, green: number, blue: number) {
    this.rgb = new Uint8ClampedArray([red, green, blue]);
  }

  get red(): number {
    return this.rgb[0];
  }

  get green(): number {
    return this.rgb[1];
  }

  get blue(): number {
    return this.rgb[2];
  }

  get rgbCss(): string {
    return `rgb(${this.rgb[0]},${this.rgb[1]},${this.rgb[2]})`;
  }

  public static create(red: number, green: number, blue: number) {
    return new ColorRgb(red, green, blue);
  }
}
