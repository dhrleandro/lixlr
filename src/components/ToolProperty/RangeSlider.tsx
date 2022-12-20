import React from "react";
import styles from "../../styles/RangeSlider.module.css";

interface RangeSliderProps {
  min: number;
  max: number;
  value: number;
  showValue?: boolean;
  onValueChange?: (value: number) => void;
}

function RangeSlider(props: RangeSliderProps) {

  const ref = React.useRef<HTMLInputElement>(null);
  const [value, setValue] = React.useState(props.value);

  // only on the first render
  React.useEffect(() => {
    if (ref.current)
      ref.current.value = `${props.value}`;
  }, []);

  function updateValue(event: React.ChangeEvent<HTMLInputElement>): void {
    const value = parseInt(event.target.value);
    if (props.onValueChange)
      props.onValueChange(value);

    setValue(value);
  }

  return (
    <div className={styles.rangeSlider}>
      <input
        type="range"
        min={props.min}
        max={props.max}
        step={1}
        className={styles.slider}
        ref={ref}
        onChange={event => updateValue(event)}
        style={props.showValue ? {width: '80%'} : {width: '100%'}}
      >
      </input>
      {props.showValue && <span className={styles.valueText}>{value}</span>}
    </div>
  );
}

export default RangeSlider;
