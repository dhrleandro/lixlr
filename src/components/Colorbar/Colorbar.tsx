import React from "react";
import styles from "../../styles/Colorbar.module.css";
import { useDispatch, useTrackedState } from "../../state/store";
import { ToolType } from "../../core/tools/ToolType";
import { ActionType } from "../../core/state/Store";
import ColorButton from "./ColorButton";
import RGBA from "../../core/entities/RGBA";

function Colorbar() {

  const dispatch = useDispatch();
  const appState = useTrackedState();

  function setTool(value: ToolType) {
    dispatch({ type: ActionType.SELECT_TOOL, value });
  }

  // https://www.lexaloffle.com/bbs/?tid=44957
  // https://gitlab.com/pico-8/aseprite/-/blob/main/pico-8-complete.gpl
  const colors = [
    RGBA.create(0, 0, 0), // Black
    RGBA.create(29, 43, 83), // 	Storm
    RGBA.create(126, 37, 83), // 	Wine
    RGBA.create(0, 135, 81), // 	Moss
    RGBA.create(171, 82, 54), // 	Tan
    RGBA.create(95, 87, 79), // 	Slate
    RGBA.create(194, 195, 199), // 	Silver
    RGBA.create(255, 241, 232), // 	White
    RGBA.create(255, 0, 77), // 	Ember
    RGBA.create(255, 163, 0), // 	Orange
    RGBA.create(255, 236, 39), // 	Lemon
    RGBA.create(0, 228, 54), // 	Lime
    RGBA.create(41, 173, 255), // 	Sky
    RGBA.create(131, 118, 156), // 	Dusk
    RGBA.create(255, 119, 168), // 	Pink
    RGBA.create(255, 204, 170), // 	Peach
    RGBA.create(41, 24, 20), // 	Cocoa
    RGBA.create(17, 29, 53), // 	Midnight
    RGBA.create(66, 33, 54), // 	Port
    RGBA.create(18, 83, 89), // 	Sea
    RGBA.create(116, 47, 41), // 	Leather
    RGBA.create(73, 51, 59), // 	Charcoal
    RGBA.create(162, 136, 121), // 	Olive
    RGBA.create(243, 239, 125), // 	Sand
    RGBA.create(190, 18, 80), // 	Crimson
    RGBA.create(255, 108, 36), // 	Amber
    RGBA.create(168, 231, 46), // 	Tea
    RGBA.create(0, 181, 67), // 	Jade
    RGBA.create(6, 90, 181), // 	Denim
    RGBA.create(117, 70, 101), // 	Aubergine
    RGBA.create(255, 110, 89), // 	Salmon
    RGBA.create(255, 157, 129), // 	Coral
  ];


  return (
    <div className={styles.colorbar}>
      {colors.map(
        (color, key) => (
          <ColorButton
            key={key}
            // selected={appState.state.selectedTool === color}
            click={() => {}}
            color={color}
          />
        )
      )}
    </div>
  );
}

export default Colorbar;
