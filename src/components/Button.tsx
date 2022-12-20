import React, { MouseEvent, MouseEventHandler } from 'react';

type ButtonPorps = {
  click?: MouseEventHandler<HTMLButtonElement> | undefined;
  color?: string;
  children?: React.ReactNode;
  w?: number,
  h?: number,
  style?: React.CSSProperties
}

function Button(props: ButtonPorps) {

  function handleClick(event: MouseEvent<HTMLButtonElement>): void {
    event.stopPropagation();

    if (props.click)
      props.click(event);
  }

  return (
    <button
      onClick={handleClick}
      className="Button"
      style={{
        backgroundColor: props.color,
        width: props.w,
        height: props.h,
        cursor: 'grab',
        ...props.style
      }}
    >
      {props.children}
    </button>
  );
}

export default Button;
