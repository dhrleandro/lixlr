import React from 'react';
import Button from './Button';

type ColorbarProps = {
  colorSelect?: Function;
}

function Colorbar(props: ColorbarProps) {

  const getColors = (): Array<string> => {
    let colors: string[] = [];

    colors.push('rgb(0,0,0)');
    colors.push('rgb(85,85,85)');
    colors.push('rgb(170,170,170)');

    colors.push('rgb(85,0,0)');
    colors.push('rgb(170,0,0)');
    colors.push('rgb(255,0,0)');

    colors.push('rgb(0,85,0)');
    colors.push('rgb(0,170,0)');
    colors.push('rgb(0,255,0)');

    colors.push('rgb(0,0,85)');
    colors.push('rgb(0,0,170)');
    colors.push('rgb(0,0,255)');

    return colors;
  }

  return (
    <div className="Colorbar">
      {getColors().map((color, i) =>
        <Button
          click={() => {props.colorSelect!(color)}} color={color} key={i}
          w={32}
          h={32}
        />
      )}
    </div>
  );
}

export default Colorbar;
