import React from "react";

interface ThemeContextInterface {
  toggle: false,
  toggleFunction: () => void,
};

const ThemeContext = React.createContext<ThemeContextInterface | undefined>(undefined);


interface ThemeProviderProps {
  children?: React.ReactNode;
}

function ThemeProvider(props: ThemeProviderProps) {

  const THEME_STATE = 'theme_state';

  function setLocalStorageState(bool: boolean): void {
    try {
      const value = bool ? '1' : '0';
      window.localStorage.setItem(THEME_STATE, value);
    } catch (error) {
      return;
    }
  }

  function getLocalStorageState(): boolean {
    try {
      const value = window.localStorage.getItem(THEME_STATE);
      if (!value)
        return false;

      const parse = Math.floor(parseInt(value));
      if (parse < 0 || parse > 1)
        return false;

      return parse === 1 ? true : false;

    } catch (error) {
      return false;
    }
  }

  const  [toggle, setToggle] = React.useState(getLocalStorageState());
  const toggleFunction = () => {
    const value = !toggle;
    setToggle(value);
    setLocalStorageState(value);
  }

  const themeContext = {
    toggle,
    toggleFunction
  } as ThemeContextInterface;

  return (
    <ThemeContext.Provider value={themeContext}>
        {props.children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
