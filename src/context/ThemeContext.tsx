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

  const  [toggle, setToggle] = React.useState(false);
  const toggleFunction = () => setToggle(!toggle);

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
