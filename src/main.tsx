import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { Toaster } from "sonner";
import { Provider as ReduxProvider } from "react-redux/es/exports";
import { store } from "./global/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <App />
      <Toaster richColors={true} closeButton={true} theme="dark" />
    </ReduxProvider>
  </React.StrictMode>
);
