import React from "react";
import styles from "./Container.module.css";

interface ContainerProps {
  className?: string;
  children?: React.ReactNode;
}

function Container(props: ContainerProps) {

  return (
    <div className={`${styles.container} ${props.className}`}>
      {props.children}
    </div>
  );
}

export default Container;
