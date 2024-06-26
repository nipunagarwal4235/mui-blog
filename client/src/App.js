import React, { useEffect } from "react";

import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./store";

import Header from "./components/Header";
import Auth from "./components/Auth";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  // console.log(isLoggedIn)
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login());
    }
  }, [dispatch]);
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
    <Router>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <header>
            <Header
              theme={theme}
              colorMode={colorMode}
              toggleColorMode={colorMode.toggleColorMode}
            />
          </header>
          <main>
            <Routes>
              {!isLoggedIn ? (
                <Route path="/auth" element={<Auth />} />
              ) : (
                <>
                  <div>Hi</div>
                </>
              )}
            </Routes>
          </main>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Router>
  );
}

export default App;
