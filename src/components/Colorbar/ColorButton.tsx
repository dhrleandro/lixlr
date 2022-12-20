import React, { MouseEventHandler } from "react";
import RGBA from "../../core/entities/RGBA";
import Button, { ButtonProps } from '../Button';

interface ColorButtonProps {
  selected?: boolean | undefined,
  click?: MouseEventHandler<HTMLButtonElement> | undefined;
  color?: RGBA
}

function ColorButton(props: ColorButtonProps) {

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
          borderRadius: '0.4rem',
          backgroundColor: props.color?.rgbaCss
          }}
        >
        </div>
      </Button>
  );
}

export default ColorButton;
