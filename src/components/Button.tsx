import React, { MouseEvent, MouseEventHandler } from 'react';
import styles from "../styles/Button.module.css";

export interface ButtonProps {
  children?: React.ReactNode;
  w?: number,
  h?: number,
  style?: React.CSSProperties | undefined,
  className?: string,

  light?: boolean | undefined,
  solid?: boolean | undefined,
  border?: boolean | undefined,

  selected?: boolean | undefined,

  click?: MouseEventHandler<HTMLButtonElement> | undefined;
}

function Button(props: ButtonProps) {

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
        ${props.className}
      `}
      style={{
        width: props.w ?? 32,
        height: props.h ?? 32,
        ...props.style
      }}
    >
      {props.children}
    </button>
  );
}

export default Button;
