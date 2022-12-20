import React from 'react';
import Button from './Button';
import { ReactComponent as Pencil } from '../assets/pencil.svg';
import { ReactComponent as Brush } from '../assets/brush.svg';
import { ReactComponent as Hand } from '../assets/hand.svg';
import { MouseEventHandler } from 'react';

type ToolbarProps = {
  pen?: MouseEventHandler<HTMLButtonElement> | undefined;
  brush?: MouseEventHandler<HTMLButtonElement> | undefined;
  hand?: MouseEventHandler<HTMLButtonElement> | undefined;
  center?: MouseEventHandler<HTMLButtonElement> | undefined;
}

function Toolbar(props: ToolbarProps) {

  return (
    <div className="Toolbar">
      <Button click={props.pen} w={32} h={32}><Pencil /></Button>
      <Button click={props.brush} w={32} h={32}><Brush /></Button>
      <Button click={props.hand} w={32} h={32}><Hand /></Button>
      {/* <Button click={props.center}>C</Button> */}
    </div>
  );
}

export default Toolbar;
