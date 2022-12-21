import React from "react";
import { ActionType } from "../core/state/Store";
import { ArrowsPointingIn, Minus, Plus } from "../icons";
import { useDispatch, useTrackedState } from "../state/store";
import styles from "../styles/Zoom.module.css";
import Button from "./Button";
import Container from "./Container";
import Text from "./Text";

interface ZoomProps {
  recenterEditor?: () => void;
}

function Zoom(props: ZoomProps) {

  const dispatch = useDispatch();
  const stateManager = useTrackedState();
  const zoom = Math.floor(stateManager.state.scale * 100);

  React.useEffect(() => {}, [stateManager.state.scale]);

  return (
    <div className={styles.container}>

      <Button
        className={`${styles.centerButton} ${styles.iconSize}`}
        light={true}
        click={props.recenterEditor}
      >
        <ArrowsPointingIn />
      </Button>

      <Container className={styles.zoom}>
        <Button
          light={true}
          w={32}
          h={32}
          className={styles.iconSize}
          click={() => {
            const step = (stateManager.state.scale <= 1) ? 0.1 : 1;
            const value = stateManager.state.scale - step;
            dispatch({ type: ActionType.SET_ZOOM, value });
          }}
        >
          <Minus />
        </Button>

        <span className={styles.vr}></span>

        <div className={styles.zoomValue}>
          <Text>{zoom}%</Text>
        </div>

        <span className={styles.vr}></span>

        <Button
          light={true}
          w={32}
          h={32}
          className={styles.iconSize}
          click={() => {
            const step = (stateManager.state.scale < 1) ? 0.1 : 1;
            const value = stateManager.state.scale + step;
            dispatch({ type: ActionType.SET_ZOOM, value });
          }}
        >
          <Plus />
        </Button>
      </Container>
    </div>
  );
}

export default Zoom;
