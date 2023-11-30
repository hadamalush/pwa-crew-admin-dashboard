import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App.tsx";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <Toaster richColors={true} closeButton={true} theme="dark" />
  </React.StrictMode>
);
