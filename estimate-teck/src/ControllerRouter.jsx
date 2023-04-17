import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Spin } from "antd";
import { ServiciesRol } from "./components/login/ServiciesRol";
import AuthRequired from "./components/login/AuthRequired"
import NotFound from "./components/pages/NotFound"
import Landing from "./components/pages/Landing";
import Login from "./components/login/Login";
import HomeApp from "./components/pages/HomeApp";
import AppRouter from "./AppRouter";
import IndexAdminPersonnel from "./components/admin-personnel/IndexAdminPersonnel";
import IndexEstimate from "./components/estimate/IndexEstimate";
import FormMainEstimate from "./components/estimate/FormMainEstimate";

import IndexTarifario from "./components/tarifarioHora/IndexTarifario";

import indexProject from "./components/projects/indexProjects";
import IndexAdminClient from "./components/client/IndexAdminClient";
import IndexProductividad from "./components/productividadPF/IndexProductividad";
import ProfileUser from "./components/admin-personnel/PageProfile/ProfileUser";
import FormProjects from "./components/projects/FormProjects";
import IndexRequerClient from "./components/RequirementClient/IndexRequirementClient";
import FormReqisiteIA from "./components/RequirementClient/FormRequisiteIA";

const ControllerRouter = () => {
  return (
    <Routes>

      {/*ruta base */}
      <Route index element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<AppRouter component={HomeApp} />} />
      <Route path="/profile" element={<AppRouter component={ProfileUser} />} />
      <Route path="/notfound" element={<AppRouter component={NotFound} />} />

      {/* protected routes para Gerente de Tic */}
      <Route element={<AuthRequired allRoles={[ServiciesRol.rol1]} />}>
        <Route path="/admin-personnel" element={<AppRouter component={IndexAdminPersonnel} />} />
      </Route>

      {/* protected routes para Gerente general y enc.proyecto*/}
      <Route element={<AuthRequired allRoles={[ServiciesRol.rol3, ServiciesRol.rol2]} />}>
        <Route path="/projects" element={<AppRouter component={indexProject} />} />
        <Route path="/client" element={<AppRouter component={IndexAdminClient} />} />
        <Route path="/tarifarioHora" element={<AppRouter component={IndexTarifario} />} />
        <Route path="/productividadpf" element={<AppRouter component={IndexProductividad} />} />

        <Route path="/register/projects" element={<AppRouter component={FormProjects} />} />

        <Route path="edit/projects/:idProject" element={<AppRouter component={FormProjects} />} />

        <Route path="/project/requirementClient/:idProyecto" element={<AppRouter component={IndexRequerClient} />} />


        <Route path="/project/requirement-generations/:idProyecto" element={<AppRouter component={FormReqisiteIA} />} />


        <Route path="/project/estimate/:idProyecto" element={<AppRouter component={IndexEstimate} />} />

        <Route path="/form-estimate/project/:idProyecto" element={<AppRouter component={FormMainEstimate} />} />


      </Route>

      {/* protected routes solo para Gerente general*/}
      <Route element={<AuthRequired allRoles={[ServiciesRol.rol1]} />}>

      </Route>

      <Route path='*' element={<Suspense fallback={<Spin />}><NotFound /></Suspense>} />

    </Routes>
  );
};

export default ControllerRouter;
