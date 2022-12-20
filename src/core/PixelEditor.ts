import Point2D from "./entities/Point2D";
import Rect2D from "./entities/Rect2D";
import { BaseViewChild } from "./ViewChild";

export default class PixelEditor extends BaseViewChild {

  constructor(position?: Point2D, size?: Rect2D) {
    super(position, size);
  }

  protected draw() {
    const ctx = this.getContext();
    ctx.clearRect(0, 0, this.size.width, this.size.height);
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, this.size.width, this.size.height);

    const color = [
      '#CCCCCC',
      '#FFFFFF'
    ];

    for (let y = 0; y < this.size.height; y++) {

      let par = (y % 2) === 0 ? true : false;
      let fristColor = (y % 2) === 0 ? 0 : 1;
      let secondColor = (fristColor === 0) ? 1 : 0;

      for (let x = 0; x < this.size.width; x++) {

        let colorId = (x % 2) === 0 ? fristColor : secondColor;
        ctx.fillStyle = color[colorId];
        ctx.fillRect(x, y, 1, 1);

      }

    }
  }
}
