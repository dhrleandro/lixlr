import React from "react";
import Sidebar from "../Sidebar";
import styles from "../../styles/ToolProperty.module.css";
import { useDispatch, useTrackedState } from "../../state/store";
import { ActionType } from "../../core/state/Store";
import Button from "../Button";
import { Adjustments } from "../../icons";
import RangeSlider from "../RangeSlider";
import Text from "../Text";
import { ToolType } from "../../core/tools/ToolType";

function ToolProperty() {

  const dispatch = useDispatch();
  const stateManager = useTrackedState();

  function sizeProperty(): JSX.Element {
    return (
      <>
        <Text style={{marginBottom: '1rem'}}><strong>Size:</strong></Text>
        <RangeSlider
          min={0}
          max={100}
          value={10}
          showValue={true}
          onValueChange={(value: number) => {
            dispatch({ type: ActionType.SET_TOOL_SIZE, value });
          }}
        />
      </>
    );
  }

  return (
    <>
      {(stateManager.state.selectedTool === ToolType.BRUSH || stateManager.state.selectedTool === ToolType.ERASER) &&
        <Sidebar
          openIcon={<Adjustments/>}
          right={false}
          buttonTop={36}
        >
          <div className={styles.toolProperty}>
              { sizeProperty() }
          </div>
        </Sidebar>
      }
    </>
  );
}

export default ToolProperty;
