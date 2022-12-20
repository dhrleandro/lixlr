import React from "react";
import styles from "../../styles/Toolbar.module.css";
import ToolButton from "./ToolButton";
import { Brush, Eraser, Hand, Pencil } from "../../icons";

export enum ToolbarTools {
  PEN = 0,
  BRUSH = 1,
  ERASER = 2,
  HAND = 3,
}

interface ToolbarProps {
  selectedTool: ToolbarTools
}

function Toolbar(props: ToolbarProps) {

  const [selectedTool, setSelectedTool] = React.useState<ToolbarTools>(props.selectedTool);

  const tools = [
    ToolbarTools.PEN,
    ToolbarTools.BRUSH,
    ToolbarTools.ERASER,
    ToolbarTools.HAND,
  ];

  function getToolIcon(tool: ToolbarTools): React.ReactNode | undefined {
    switch (tool) {
      case ToolbarTools.PEN:
        return <Pencil />;

      case ToolbarTools.BRUSH:
        return <Brush />;

      case ToolbarTools.ERASER:
        return <Eraser />;

      case ToolbarTools.HAND:
        return <Hand />;

      default:
        return undefined;
    }
  }

  React.useEffect(() => {}, [selectedTool]);

  return (
    <div className={styles.toolbar}>
      {tools.map(
        (item, key) => (
          <ToolButton
            key={key}
            selected={selectedTool === item}
            click={() => setSelectedTool(item)}
          >
            { getToolIcon(key) }
          </ToolButton>
        )
      )}
    </div>
  );
}

export default Toolbar;
