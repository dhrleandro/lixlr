import React from "react";

interface ContainerProps {
  style?: React.CSSProperties,
  children?: React.ReactNode;
}

function Text(props: ContainerProps) {

  return (
    <div style={{...props.style, color: 'var(--high-contrast-text)'}}>
      {props.children}
    </div>
  );
}

export default Text;
