import React from "react";
import styles from "../styles/DropdownButton.module.css";

export interface DropDownItem {
  text: string;
  value: number;
}

interface DropdownButtonProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties | undefined;
  items: DropDownItem[];
}

function DropdownButton(props: DropdownButtonProps) {

  const listItems = props.items.map((item: DropDownItem, index: number) =>
    <a
      key={index}
      // onClick={() => selectLayer(layer.getId())}
    >
      {item.text}
    </a>
  );

  return (
    <div className={styles.dropdown}>
      <button className={styles.dropbtn}>Dropdown</button>
      <div className={styles.dropdownContent}>
        {listItems}
      </div>
  </div>
  );
}

export default DropdownButton;
