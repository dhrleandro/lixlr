import React from "react";

interface ContainerProps {
  children?: React.ReactNode;
}

function Text(props: ContainerProps) {

  return (
    <div style={{color: 'var(--high-contrast-text)'}}>
      {props.children}
    </div>
  );
}

export default Text;
