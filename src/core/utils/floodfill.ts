import Point2D from "../entities/Point2D";
import RGBA from "../entities/RGBA";
import { getPixel } from "./graphic";

// Returns true if specified row and col coordinates are in the matrix
function validCoordinates(matrix: Uint8ClampedArray, imageWidth: number, x: number, y: number): boolean {
  const red = y * (imageWidth * 4) + x * 4;

  return (
    matrix[red] !== undefined &&
    matrix[red + 1] !== undefined &&
    matrix[red + 2] !== undefined &&
    matrix[red + 3] !== undefined
  );
}

// Set a cell in the matrix
function setCell(matrix: Uint8ClampedArray, imageWidth: number, x: number, y: number, color: RGBA): void {
  if (validCoordinates(matrix, imageWidth, x, y)) {
    const red = y * (imageWidth * 4) + x * 4;

    matrix[red] = color.red;
    matrix[red + 1] = color.green;
    matrix[red + 2] = color.blue;
    matrix[red + 3] = color.alpha;
  }
}

export function getMatrixPixel(matrix: Uint8ClampedArray, imageWidth: number, x: number, y: number): RGBA {
  const red = y * (imageWidth * 4) + x * 4;
  return RGBA.create(matrix[red], matrix[red + 1], matrix[red + 2], matrix[red + 3]);
}

// Flood fill algorithm implemented with a stack on the heap
// This algorithm will also work with big size matrixes

export default function floodFill(context: CanvasRenderingContext2D, row: number, col: number, color: RGBA): void {
  const matrix = context.getImageData(0, 0, context.canvas.width, context.canvas.height);
  let matrixData = matrix.data; // reference of imageData.data

  row = Math.floor(row);
  col = Math.floor(col);

  const delimitedColor = getPixel(matrix, col, row);

  let fillStack: {row: number, col: number}[] = [];
  fillStack.push({row, col});

  while (fillStack.length > 0) {
    const point = fillStack.pop();
    const row = point?.row || -1;
    const col = point?.col || -1;

    if (!validCoordinates(matrixData, matrix.width, row, col))
      continue;

    if (getMatrixPixel(matrixData, matrix.width, row, col).isEqual(delimitedColor) === false)
      continue;

    setCell(matrixData, matrix.width, row, col, color);

    fillStack.push({row: row + 1, col: col});
    fillStack.push({row: row - 1, col: col});
    fillStack.push({row: row, col: col + 1});
    fillStack.push({row: row, col: col - 1});
  }

  context.putImageData(matrix, 0, 0);
}
