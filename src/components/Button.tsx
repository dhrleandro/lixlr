import React, { MouseEventHandler } from 'react';

type ButtonPorps = {
  click?: MouseEventHandler<HTMLButtonElement> | undefined;
  color?: string;
  children?: React.ReactNode;
  w?: number,
  h?: number
}

function Button(props: ButtonPorps) {

  return (
    <button
      onClick={props.click}
      className="Button"
      style={{backgroundColor: props.color, width: props.w, height: props.h}}
    >
      {props.children}
    </button>
  );
}

export default Button;
