import React from "react";
import Button from '../Button';

interface ToolButtonProps {
  children?: React.ReactNode
}

function ToolButton(props: ToolButtonProps) {

  const [selected, setSelected] = React.useState(false);

  function toggleSelected() {
    setSelected(!selected);
  }

  return (
      <Button
        w={32}
        h={32}
        selected={selected}
        click={toggleSelected}
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
