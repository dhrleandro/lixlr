import React from "react";
import styles from "../../styles/Toolbar.module.css";
import ToolButton from "./ToolButton";
import { Brush, Eraser, Hand, Pencil, Minus, Stop } from "../../icons";
import { useDispatch, useTrackedState } from "../../state/store";
import { ToolType } from "../../core/tools/ToolType";
import { ActionType } from "../../core/state/Store";

function Toolbar() {

  const dispatch = useDispatch();
  const appState = useTrackedState();

  function setTool(value: ToolType) {
    dispatch({ type: ActionType.SELECT_TOOL, value });
  }

  const tools = [
    ToolType.PEN,
    ToolType.BRUSH,
    ToolType.LINE,
    ToolType.RECTANGLE,
    ToolType.ERASER,
    ToolType.HAND,
  ];

  function getToolIcon(tool: ToolType): React.ReactNode | undefined {
    switch (tool) {
      case ToolType.PEN:
        return <Pencil />;

      case ToolType.BRUSH:
        return <Brush />;

      case ToolType.LINE:
        return <Minus style={{transform: "rotate(-45deg)"}}/>;

      case ToolType.RECTANGLE:
        return <Stop />;

      case ToolType.ERASER:
        return <Eraser />;

      case ToolType.HAND:
        return <Hand />;

      default:
        return undefined;
    }
  }

  return (
    <div className={styles.toolbar}>
      {tools.map(
        (item, key) => (
          <ToolButton
            key={key}
            selected={appState.state.selectedTool === item}
            click={() => setTool(item)}
          >
            { getToolIcon(item) }
          </ToolButton>
        )
      )}
    </div>
  );
}

export default Toolbar;
