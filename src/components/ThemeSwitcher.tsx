import React from "react";
import { ThemeContext } from "../context/ThemeContext";
import styles from "../styles/ThemeSwitcher.module.css";

interface ThemeSwitcher {
}

function ThemeSwitcher(props: ThemeSwitcher) {

  const themeContext = React.useContext(ThemeContext);
  const [checked, setChecked] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!themeContext)
      return;

      setChecked(themeContext.toggle);

  }, [themeContext]);

  function toggleTheme() {
    themeContext?.toggleFunction();
  }

  return (
    <>
      <label id="switch" className={styles.switch}>
        <input type="checkbox" onChange={toggleTheme} checked={checked} />
        <span className={`${styles.slider} ${styles.round}`}></span>
      </label>
    </>
  );
}

export default ThemeSwitcher;
