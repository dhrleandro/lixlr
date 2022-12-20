import React from "react";
import Point from "../../core/entities/Point";
import { useStateRef } from "../../hooks/useStateRef";
import "./DraggableContainer.css";

type DraggableContainerPorps = {
  title?: string;
  className?: string;
  children?: React.ReactNode;
}

function DraggableContainer(props: DraggableContainerPorps) {

  const divReference = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = useStateRef<Point>(Point.create(0,0));
  const [dragging, setDragging] = useStateRef<boolean>(false);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.preventDefault();

    setDragging(true);
    setPosition(Point.create(event.clientX, event.clientY));

    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointermove', onPointerMove);
  }

  const onPointerMove = (event: PointerEvent) => {
    if (!divReference.current) return;

    if (dragging()) {
      const delta = Point.create(
        position().x - event.clientX,
        position().y - event.clientY
      );

      setPosition(Point.create(event.clientX, event.clientY));

      const element = divReference.current;
      element.style.left = (element.offsetLeft - delta.x) + 'px';
      element.style.top = (element.offsetTop - delta.y) + 'px';
    }

    event.stopPropagation();
    event.preventDefault();
  }

  const onPointerUp = (event: PointerEvent) => {
    event.stopPropagation();
    event.preventDefault();

    setDragging(false);

    window.removeEventListener('pointerup', onPointerUp);
    window.removeEventListener('pointermove', onPointerMove);
  }

  React.useEffect(() => {

    return () => {
      if (!divReference.current) return;
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointermove', onPointerMove);
    }
  }, [divReference]);

  return (
    <div
      className={`DraggableContainer ${props?.className}`}
      ref={divReference}
    >
      <div
        className="header"
        onPointerDown={onPointerDown}
      >
        {props.title}
      </div>
      <div className="body">
        {props.children}
      </div>
    </div>
  );
}

export default DraggableContainer;
