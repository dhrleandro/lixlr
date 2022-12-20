export default class Point2D {

  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public static create(x: number, y: number): Point2D {
    return new Point2D(x, y);
  }
}
