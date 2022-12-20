export default class RGBA {

  private rgba: Uint8ClampedArray;

  constructor(red: number = 0, green: number = 0, blue: number = 0, alpha: number = 255) {
    this.rgba = new Uint8ClampedArray([red, green, blue, alpha]);
  }

  get red(): number {
    return this.rgba[0];
  }

  get green(): number {
    return this.rgba[1];
  }

  get blue(): number {
    return this.rgba[2];
  }

  get alpha(): number {
    return this.rgba[3];
  }

  get rgbaCss(): string {
    return `rgba(${this.rgba[0]},${this.rgba[1]},${this.rgba[2]},${this.rgba[3]})`;
  }

  public isEqual(color: RGBA, alpha: boolean = true): boolean {
    if (alpha) {

      return (
        color.red === this.red &&
        color.green === this.green &&
        color.blue === this.blue &&
        color.alpha === this.alpha
      );

    } else {

      return (
        color.red === this.red &&
        color.green === this.green &&
        color.blue === this.blue
      );

    }
  }

  public static create(red: number, green: number, blue: number, alpha: number = 255) {
    return new RGBA(red, green, blue, alpha);
  }
}
