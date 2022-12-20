import React from "react";
import Button, { ButtonProps } from '../Button';

function ToolButton(props: ButtonProps) {

  return (
      <Button
        w={32}
        h={32}
        selected={props.selected}
        click={props.click}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '24px',
          height: '24px',
          }}
        >
          {props.children}
        </div>
      </Button>
  );
}

export default ToolButton;
