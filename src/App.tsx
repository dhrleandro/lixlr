import React from "react";
import { ThemeContext } from "./context/ThemeContext";
import Container from "./components/Container";
import ThemeSwitcher from "./components/ThemeSwitcher";
import Text from "./components/Text";

function App() {

  const themeContext = React.useContext(ThemeContext);
  const [theme, setTheme] = React.useState('dark-theme');

  React.useEffect(() => {
    if (!themeContext)
      return;

    setTheme(themeContext.toggle ? 'light-theme' : 'dark-theme');

  }, [themeContext]);

  return (
    <Container className={`App ${theme}`}>
      <div style={{position: 'absolute', top: '0', right: '8px', padding: '16px'}}>
        <ThemeSwitcher />
      </div>
    </Container>
  );
}

export default App;
