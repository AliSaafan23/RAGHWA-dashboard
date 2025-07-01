import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Dashboard from "./pages/Dashboard.jsx";
import { store } from './redux/Store.js'
import { Provider } from 'react-redux'

import './css/global.module.css'; // Import global styles
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}  >
      <Dashboard />
    </Provider>
  </StrictMode>
);
