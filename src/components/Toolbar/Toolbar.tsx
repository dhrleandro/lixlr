import React from "react";
import styles from "../../styles/Toolbar.module.css";
import ToolButton from "./ToolButton";
import { Brush, Eraser, Hand, Pencil } from "../../icons";

interface ContainerProps {

}

function Toolbar(props: ContainerProps) {

  return (
    <div className={styles.toolbar}>
      <ToolButton><Pencil /></ToolButton>
      <ToolButton><Brush /></ToolButton>
      <ToolButton><Eraser /></ToolButton>
      <ToolButton><Hand /></ToolButton>
    </div>
  );
}

export default Toolbar;
