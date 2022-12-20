export default class Point {

  private xPos: number;
  private yPos: number;

  constructor(x: number, y: number) {
    this.xPos = x;
    this.yPos = y;
  }

  get x(): number {
    return this.xPos;
  }

  get y(): number {
    return this.yPos;
  }

  public static create(x: number, y: number): Point {
    return new Point(x, y);
  }
}
