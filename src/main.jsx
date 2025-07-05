import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Dashboard from "./pages/Dashboard.jsx";
import { store } from "./redux/Store.js";
import { Provider } from "react-redux";
import "./css/global.module.css"; // Import global styles
import { Mainlayout } from "./layout/Mainlayout.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";

// Create RTL cache for Emotion
const cacheRtl = createCache({
  key: "mui-rtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

// Create an RTL theme
const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: '"Noto Sans Arabic", sans-serif', // Arabic font
  },
});
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <div className="App" dir="rtl">
            {/* <Dashboard /> */}
            <Mainlayout />
          </div>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  </StrictMode>
);
