import React from "react";
import Container from "../components/Container";
import ThemeSwitcher from "../components/ThemeSwitcher";
import Toolbar from "../components/Toolbar";
import { ToolbarTools } from "../components/Toolbar/Toolbar";
import { useCanvasPixelEditor } from "../hooks/useCanvasPixelEditor";
import styles from '../styles/Editor.module.css';

function Editor() {

  const container = React.useRef<HTMLDivElement>(null);
  const editor = useCanvasPixelEditor(container);

  React.useEffect(() => {}, [container]);

  return (
    <Container className={styles.editor}>
      <div className={styles.appbar}>
        <div></div>
        <Toolbar selectedTool={ToolbarTools.BRUSH}/>
        <div><ThemeSwitcher/></div>
      </div>

      <div className={styles.pixeleditor} ref={container}>asdsadsadd</div>

    </Container>
  );
}

export default Editor;
