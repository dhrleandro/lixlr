import React from "react";
import { ThemeContext } from "./context/ThemeContext";
import Container from "./components/Container";
import styles from './styles/App.module.css';
import Editor from "./screens/Editor";

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
      <Editor />
    </Container>
  );
}

export default App;
