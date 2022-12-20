import React, { MouseEvent, MouseEventHandler } from 'react';
import styles from "../styles/Button.module.css";

export type ButtonPorps = {
  children?: React.ReactNode;
  w?: number,
  h?: number,
  style?: React.CSSProperties | undefined,

  light?: boolean | undefined,
  solid?: boolean | undefined,
  border?: boolean | undefined,

  selected?: boolean | undefined,

  click?: MouseEventHandler<HTMLButtonElement> | undefined;
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
      className={`
        ${styles.button}
        ${props.light ? styles.light : ''}
        ${props.solid ? styles.solid : ''}
        ${props.border ? styles.border : ''}
        ${props.selected ? styles.selected : ''}
      `}
      style={{
        width: props.w,
        height: props.h,
        ...props.style
      }}
    >
      {props.children}
    </button>
  );
}

export default Button;
