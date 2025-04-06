// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Layout from "./routes/Layout.jsx";
import DetailView from "./routes/DetailView";
import NotFound from "./routes/NotFound";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<App />} />
          <Route path="coinDetails/:symbol" element={<DetailView />} />
          <Route path="*" element={<NotFound />} /> {/*Catch-all route */}
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>
);
