import { Route, Routes } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchMe, selectIsAuth } from "./redux/slices/auth";
import React from "react";

import HomePage from './scenes/global/HomePage';
import Registration from './scenes/registration/index';
import Login from './scenes/login/index';
import Reset from './scenes/reset/index';
import Projects from './scenes/projects/index';
import ResetContinue from "./scenes/reset/index-continue";

function App() {
  const [theme, colorMode] = useMode();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchMe());
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <main className="content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reset" element={<Reset />} />
              <Route path="/reset-continue" element={<ResetContinue />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
