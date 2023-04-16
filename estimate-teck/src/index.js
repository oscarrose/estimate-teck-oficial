import "./index.css";
import "antd/dist/reset.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import ControllerRouter from "./ControllerRouter";
import { UserProvider } from './contexts/UserProvider';
import { UseProviderEstimate } from "./contexts/UseProviderEstimate";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
      <UseProviderEstimate>
      <Routes>
        <Route path="/*" element={<ControllerRouter />}></Route>
      </Routes>
      </UseProviderEstimate>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
