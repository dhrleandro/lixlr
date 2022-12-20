export default class Rect2D {

  public width: number;
  public height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  public static create(width: number, height: number): Rect2D {
    return new Rect2D(width, height);
  }
}
