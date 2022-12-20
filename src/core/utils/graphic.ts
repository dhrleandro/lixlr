import RGBA from "../entities/RGBA";
import Point2D from "../entities/Point2D";

/*
export function putPixel(x: number, y: number, context: CanvasRenderingContext2D, color: RGBA) {
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

export function putPixel(x: number, y: number, context: CanvasRenderingContext2D, color: RGBA) {
  const imgData = new ImageData(1,1);
  imgData.data[0] = color.red;
  imgData.data[1] = color.green;
  imgData.data[2] = color.blue;
  imgData.data[3] = color.alpha;

  context.putImageData(imgData, Math.floor(x), Math.floor(y));
}

export function clearPixel(x: number, y: number, context: CanvasRenderingContext2D) {
  const imgData = new ImageData(1,1);
  imgData.data[0] = 0;
  imgData.data[1] = 0;
  imgData.data[2] = 0;
  imgData.data[3] = 0;

  context.putImageData(imgData, Math.floor(x), Math.floor(y));
}

function getPixel(imageData: ImageData, x: number, y: number): RGBA {
  const red = y * (imageData.width * 4) + x * 4;
  const data = imageData.data;
  return RGBA.create(data[red], data[red + 1], data[red + 2], data[red + 3]);
}

function getPixelCSS(imageData: ImageData, x: number, y: number): string {
  return getPixel(imageData, x, y).rgbaCss;
};

// Adapted of:
// https://ghost-together.medium.com/how-to-code-your-first-algorithm-draw-a-line-ca121f9a1395
export function drawLinePoints(x1: number, y1: number, x2: number, y2: number): Point2D[] {
  let points: Point2D[] = [];

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
      points.push(Point2D.create(x,y)); // Draw first pixel
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
          points.push(Point2D.create(x,y));
      }
  } else { // The line is Y-axis dominant
      // Line is drawn bottom to top
      if (dy >= 0) {
          x = x1; y = y1; ye = y2;
      } else { // Line is drawn top to bottom
          x = x2; y = y2; ye = y1;
      }
      points.push(Point2D.create(x,y)); // Draw first pixel
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
          points.push(Point2D.create(x,y));
      }
  }

  return points;
}

export function ellipsePoints(x0: number, y0: number, x: number, y: number): Point2D[] {
	let points: Point2D[] = [];

  points.push(Point2D.create(x0 + x, y0 + y));
	points.push(Point2D.create(x0 - x, y0 + y));
	points.push(Point2D.create(x0 + x, y0 - y));
	points.push(Point2D.create(x0 - x, y0 - y));

  return points;
}

export function circlePoints(x0: number, y0: number, r: number): Point2D[] {
	let points: Point2D[] = [];

  var d = 5 - 4*r;

	var x = 0;
	var y = r;

	var deltaA = (-2*r + 5)*4;
	var deltaB = 3*4;

	while (x <= y) {
		points.push(...ellipsePoints(x0, y0, x, y));
		points.push(...ellipsePoints(x0, y0, y, x));

		if (d > 0) {
			d += deltaA;

			y -= 1;
			x += 1

			deltaA += 4*4;
			deltaB += 2*2;
		}
		else {
			d += deltaB;

			x += 1;

			deltaA += 2*4;
			deltaB += 2*4;
		}
	}

  return points;
}

// Flood Fill
// Adpted of
// https://stackoverflow.com/questions/53077955/how-do-i-do-flood-fill-on-the-html-canvas-in-javascript
function _getPixel(imageData: ImageData, x: number, y: number) {
  if (x < 0 || y < 0 || x >= imageData.width || y >= imageData.height) {
    return [-1, -1, -1, -1];  // impossible color
  } else {
    const offset = (y * imageData.width + x) * 4;
    return imageData.data.slice(offset, offset + 4);
  }
}

function _setPixel(imageData: ImageData, x: number, y: number, color: any) {
  const offset = (y * imageData.width + x) * 4;
  imageData.data[offset + 0] = color[0];
  imageData.data[offset + 1] = color[1];
  imageData.data[offset + 2] = color[2];
  imageData.data[offset + 3] = color[0];
}

function colorsMatch(a: any, b: any) {
  return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
}

export function floodFill(ctx: CanvasRenderingContext2D, x: number, y: number, fillColor: number[]) {
  // read the pixels in the canvas
  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

  // get the color we're filling
  const targetColor = _getPixel(imageData, x, y);

  // check we are actually filling a different color
  if (!colorsMatch(targetColor, fillColor)) {

    const pixelsToCheck: any[] = [x, y];
    while (pixelsToCheck.length > 0) {
      const y = pixelsToCheck.pop();
      const x = pixelsToCheck.pop();

      const currentColor = _getPixel(imageData, x, y);
      if (colorsMatch(currentColor, targetColor)) {
        _setPixel(imageData, x, y, fillColor);
        pixelsToCheck.push(x + 1, y);
        pixelsToCheck.push(x - 1, y);
        pixelsToCheck.push(x, y + 1);
        pixelsToCheck.push(x, y - 1);
      }
    }

    // put the data back
    ctx.putImageData(imageData, 0, 0);
  }
}
// End of Flood Fill
