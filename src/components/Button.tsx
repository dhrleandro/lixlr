import React, { MouseEvent, MouseEventHandler } from 'react';

type ButtonPorps = {
  click?: MouseEventHandler<HTMLButtonElement> | undefined;
  color?: string;
  children?: React.ReactNode;
  w?: number,
  h?: number
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
      style={{backgroundColor: props.color, width: props.w, height: props.h}}
    >
      {props.children}
    </button>
  );
}

export default Button;
