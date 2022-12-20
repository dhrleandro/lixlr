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
      <Container style={{padding: '16px'}}>
        <ThemeSwitcher />
        <Text><h1>The New Prologue</h1></Text>
      </Container>
    </Container>
  );
}

export default App;
