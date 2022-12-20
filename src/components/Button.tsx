import React from 'react';

type ButtonPorps = {
  click?: Function;
  color?: string;
  children?: React.ReactNode;
  w?: number,
  h?: number
}

function Button(props: ButtonPorps) {

  return (
    <button
      onClick={() => {props.click!()}}
      className="Button"
      style={{backgroundColor: props.color, width: props.w, height: props.h}}
    >
      {props.children}
    </button>
  );
}

export default Button;
