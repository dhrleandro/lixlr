import React from "react";
import { ThemeContext } from "./context/ThemeContext";
import Container from "./components/Container";
import ThemeSwitcher from "./components/ThemeSwitcher";
import Toolbar from "./components/Toolbar";

import styles from './styles/App.module.css';
import { ToolbarTools } from "./components/Toolbar/Toolbar";

function App() {

  const themeContext = React.useContext(ThemeContext);
  const [theme, setTheme] = React.useState('dark-theme');

  React.useEffect(() => {
    if (!themeContext)
      return;

    setTheme(themeContext.toggle ? 'light-theme' : 'dark-theme');

  }, [themeContext]);

  return (
    <Container className={`${styles.app} ${theme} theme-common`}>
      {/* <div style={{position: 'absolute', top: '0', right: '8px', padding: '16px'}}> */}
      <div className={styles.appbar}>
        <div></div>
        <Toolbar selectedTool={ToolbarTools.BRUSH}/>
        <div><ThemeSwitcher/></div>
      </div>
    </Container>
  );
}

export default App;
