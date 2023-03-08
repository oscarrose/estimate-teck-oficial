import React,{lazy, Suspense} from "react";
import { Routes, Route } from "react-router-dom";
import { Spin } from "antd";
import Landing from "./components/pages/Landing";
import Login from "./components/login/Login";
import HomeApp from "./components/pages/HomeApp";
import AppRouter from "./AppRouter";
import IndexAdminPersonnel from "./components/admin-personnel/IndexAdminPersonnel";
import indexEstimate from "./components/estimate/indexEstimate";
import IndexTariff from "./components/Tariff/IndexTariff";
import IndexAdminClient from "./components/client/IndexAdminClient";
const ControllerRouter = () => {
  return (
    <Routes>
      <Route index element={<Landing />} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/home" element={<AppRouter component={HomeApp} />}/>
      <Route path="/admin-personnel" element={<AppRouter component={IndexAdminPersonnel} />}/>
      <Route path="/estimate" element={<AppRouter component={indexEstimate} />}/>
      <Route path="/tariff" element={<AppRouter component={IndexTariff}/>}/>
      <Route path="/client" element={<AppRouter component={IndexAdminClient}/>}/>
    </Routes>
  );
};

export default ControllerRouter;
