import ColorRgba from "../entities/ColorRgba";
import Point from "../entities/Point";

/*
export function putPixel(x: number, y: number, context: CanvasRenderingContext2D, color: ColorRgba) {
  const imgData = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
  const red = Math.floor(y) * (imgData.width * 4) + Math.floor(x) * 4;
  const green = red + 1;
  const blue = red + 2;
  const alpha = red + 3;

  imgData.data[red] = color.red;
  imgData.data[green] = color.green;
  imgData.data[blue] = color.blue;
  imgData.data[alpha] = 255;

  context.putImageData(imgData, 0, 0);
}
*/

export function putPixel(x: number, y: number, context: CanvasRenderingContext2D, color: ColorRgba) {
  const imgData = new ImageData(1,1);
  imgData.data[0] = color.red;
  imgData.data[1] = color.green;
  imgData.data[2] = color.blue;
  imgData.data[3] = 255;

  context.putImageData(imgData, Math.floor(x), Math.floor(y));
}

export function removePixel(x: number, y: number, context: CanvasRenderingContext2D) {
  const imgData = new ImageData(1,1);
  imgData.data[0] = 0;
  imgData.data[1] = 0;
  imgData.data[2] = 0;
  imgData.data[3] = 0;

  context.putImageData(imgData, Math.floor(x), Math.floor(y));
}

// Adapted of:
// https://ghost-together.medium.com/how-to-code-your-first-algorithm-draw-a-line-ca121f9a1395
export function drawLine(x1: number, y1: number, x2: number, y2: number): Point[] {
  let points: Point[] = [];

  // Iterators, counters required by algorithm
  let x, y, dx, dy, dx1, dy1, px, py, xe, ye, i;
  // Calculate line deltas
  dx = x2 - x1;
  dy = y2 - y1;
  // Create a positive copy of deltas (makes iterating easier)
  dx1 = Math.abs(dx);
  dy1 = Math.abs(dy);
  // Calculate error intervals for both axis
  px = 2 * dy1 - dx1;
  py = 2 * dx1 - dy1;
  // The line is X-axis dominant
  if (dy1 <= dx1) {
      // Line is drawn left to right
      if (dx >= 0) {
          x = x1; y = y1; xe = x2;
      } else { // Line is drawn right to left (swap ends)
          x = x2; y = y2; xe = x1;
      }
      points.push(Point.create(x,y)); // Draw first pixel
      // Rasterize the line
      for (i = 0; x < xe; i++) {
          x = x + 1;
          // Deal with octants...
          if (px < 0) {
              px = px + 2 * dy1;
          } else {
              if ((dx < 0 && dy < 0) || (dx > 0 && dy > 0)) {
                  y = y + 1;
              } else {
                  y = y - 1;
              }
              px = px + 2 * (dy1 - dx1);
          }
          // Draw pixel from line span at
          // currently rasterized position
          points.push(Point.create(x,y));
      }
  } else { // The line is Y-axis dominant
      // Line is drawn bottom to top
      if (dy >= 0) {
          x = x1; y = y1; ye = y2;
      } else { // Line is drawn top to bottom
          x = x2; y = y2; ye = y1;
      }
      points.push(Point.create(x,y)); // Draw first pixel
      // Rasterize the line
      for (i = 0; y < ye; i++) {
          y = y + 1;
          // Deal with octants...
          if (py <= 0) {
              py = py + 2 * dx1;
          } else {
              if ((dx < 0 && dy<0) || (dx > 0 && dy > 0)) {
                  x = x + 1;
              } else {
                  x = x - 1;
              }
              py = py + 2 * (dx1 - dy1);
          }
          // Draw pixel from line span at
          // currently rasterized position
          points.push(Point.create(x,y));
      }
  }

  return points;
}
