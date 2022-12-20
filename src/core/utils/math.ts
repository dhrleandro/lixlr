import Point2D from "../entities/Point2D";
import Rect2D from "../entities/Rect2D";

export function hitTest(point: Point2D | DOMPoint, objectPosition: Point2D, objectSize: Rect2D): boolean {
  return point.x >= objectPosition.x
    && point.x <= objectPosition.x + objectSize.width
    && point.y >= objectPosition.y
    && point.y <= objectPosition.y + objectSize.height;
}
