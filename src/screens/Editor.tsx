import React from "react";
import Container from "../components/Container";
import ThemeSwitcher from "../components/ThemeSwitcher";
import Toolbar from "../components/Toolbar";
import { useCanvasPixelEditor } from "../hooks/useCanvasPixelEditor";
import { useTrackedState } from "../state/store";
import styles from '../styles/Editor.module.css';

function Editor() {

  const container = React.useRef<HTMLDivElement>(null);

  const appState = useTrackedState();
  useCanvasPixelEditor(container, appState);

  React.useEffect(() => {}, [appState, container]);

  return (
    <Container className={styles.editor}>
      <div className={styles.appbar}>
        <div></div>
        <Toolbar />
        <div><ThemeSwitcher/></div>
      </div>

      <div className={styles.pixeleditor} ref={container}>asdsadsadd</div>

    </Container>
  );
}

export default Editor;
