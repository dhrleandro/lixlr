import React from "react";
import Colorbar from "../components/Colorbar";
import Container from "../components/Container";
import DropdownButton from "../components/DropdownButton";
import LayerManager from "../components/LayerManager/LayerManager";
import ModalCredits from "../components/ModalCredits";
import ThemeSwitcher from "../components/ThemeSwitcher";
import Toolbar from "../components/Toolbar";
import { ToolProperty } from "../components/ToolProperty";
import Zoom from "../components/Zoom";
import { useCanvasPixelEditor } from "../hooks/useCanvasPixelEditor";
import { useTrackedState } from "../state/store";
import styles from '../styles/Editor.module.css';

function Editor() {

  const container = React.useRef<HTMLDivElement>(null);

  const appState = useTrackedState();
  const { recenterEditor } = useCanvasPixelEditor(container, appState);

  React.useEffect(() => {}, [appState, container]);

  return (
    <Container className={styles.editor}>
      <ModalCredits />

      <div className={styles.appbar}>
        <div>
          {/* <DropdownButton
            items={[
              {text: "200x200", value: 0},
              {text: "400x400", value: 1},
              {text: "800x800", value: 2},
            ]}
          ></DropdownButton> */}
        </div>
        <Toolbar />
        <div><ThemeSwitcher/></div>
      </div>

      <div className={styles.pixeleditor} ref={container}></div>

      <div className={styles.bottombar}><Colorbar/></div>

      <LayerManager/>
      <ToolProperty/>
      <Zoom recenterEditor={recenterEditor} />
    </Container>
  );
}

export default Editor;
