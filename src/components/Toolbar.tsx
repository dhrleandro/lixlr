import React from 'react';
import Button from './Button';
import { ReactComponent as Pencil } from '../assets/pencil.svg';
import { ReactComponent as Hand } from '../assets/hand.svg';

type ToolbarProps = {
  pen?: Function;
  hand?: Function;
  center?: Function;
}

function Toolbar(props: ToolbarProps) {

  return (
    <div className="Toolbar">
      <Button click={props.pen} w={32} h={32}><Pencil></Pencil></Button>
      <Button click={props.hand} w={32} h={32}><Hand></Hand></Button>
      {/* <Button click={props.center}>C</Button> */}
    </div>
  );
}

export default Toolbar;
