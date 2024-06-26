import React from "react";
import Header from "./components/Header";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <header>
          <Header
            theme={theme}
            colorMode={colorMode}
            toggleColorMode={colorMode.toggleColorMode}
          />
        </header>
        <h1>Hello</h1>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
