import React from "react";
import styles from "./Container.module.css";

interface ContainerProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties | undefined;
}

function Container(props: ContainerProps) {

  return (
    <div
      className={`${styles.container} ${props.className}`}
      style={props.style}
    >
      {props.children}
    </div>
  );
}

export default Container;
