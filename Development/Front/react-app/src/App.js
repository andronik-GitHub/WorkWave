import { Route, Routes } from "react-router-dom";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import HomePage from './scenes/global/HomePage';
import Registration from './scenes/registration/index';
import Login from './scenes/login/index';

function App() {
  const [theme, colorMode] = useMode();

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
              {/* <Route path="/projects" element={<Projects />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
