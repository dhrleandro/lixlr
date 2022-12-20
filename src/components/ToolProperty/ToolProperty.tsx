import React from "react";
import Sidebar from "../Sidebar";
import styles from "../../styles/ToolProperty.module.css";
import { useDispatch, useTrackedState } from "../../state/store";
import { ActionType } from "../../core/state/Store";
import Button from "../Button";
import { Adjustments } from "../../icons";
import RangeSlider from "./RangeSlider";
import Text from "../Text";
import { ToolType } from "../../core/tools/ToolType";
import RGBA from "../../core/entities/RGBA";
import Point2D from "../../core/entities/Point2D";
import { circlePoints, floodFill, putPixel } from "../../core/utils/graphic";
import { Plus, Minus } from "../../icons";

function ToolProperty() {

  const dispatch = useDispatch();
  const stateManager = useTrackedState();

  const canvas = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    if (!canvas.current)
      return;

    const color = RGBA.create(0, 0, 0, 255);
    const radius = stateManager.state.toolSize;
    const diameter = (radius * 2) + 5; // 5px safety margin

    canvas.current.width = diameter;
    canvas.current.height = diameter;

    const ctx = canvas.current.getContext('2d') as CanvasRenderingContext2D;
    ctx.imageSmoothingEnabled = false;

    const center = Point2D.create(
      Math.floor(canvas.current.width / 2),
      Math.floor(canvas.current.height / 2)
    );

    const circle = circlePoints(center.x, center.y, radius);
    circle.forEach(item => {
      putPixel(item.x, item.y, ctx, color);
    });
    floodFill(ctx, center.x, center.y, color);

  }, [stateManager.state.toolSize]);

  function sizeProperty(): JSX.Element {
    return (
      <>
        <Text style={{ marginBottom: '1rem' }}><strong>Size:</strong></Text>

        <div className={styles.flex}>
          <div className={styles.preview}>
            <canvas ref={canvas}></canvas>
          </div>
          <span>{stateManager.state.toolSize}</span>
        </div>

        <RangeSlider
          min={0}
          max={100}
          value={10}
          showValue={false}
          onValueChange={(value: number) => {
            dispatch({ type: ActionType.SET_TOOL_SIZE, value });
          }}
        />

        <div className={styles.buttons}>
          <Button
            solid={true}
            w={20}
            h={20}
            click={() => {
              const value = stateManager.state.toolSize - 1;
              dispatch({ type: ActionType.SET_TOOL_SIZE, value });
            }}
          >
            <Minus />
          </Button>

          <Button
            solid={true}
            w={20}
            h={20}
            click={() => {
              const value = stateManager.state.toolSize + 1;
              dispatch({ type: ActionType.SET_TOOL_SIZE, value });
            }}
          >
            <Plus />
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      {(stateManager.state.selectedTool === ToolType.BRUSH || stateManager.state.selectedTool === ToolType.ERASER) &&
        <Sidebar
          openIcon={<Adjustments />}
          right={false}
          buttonTop={36}
        >
          <div className={styles.toolProperty}>
            {sizeProperty()}
          </div>
        </Sidebar>
      }
    </>
  );
}

export default ToolProperty;
