import React, { useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TableUser from "./TableUser";
import ModalFormUser from "./ModalFormUser";
import ModalPasswordAndStatus from "./ModalPasswordAndStatus";
import useModuleAdminPersonnel from "../../../hooks/useModuleAdminPersonnel";
function ModuleUser() {

  const { dataRol, dataEmployee, dataUser,setDataUser, loanding } = useModuleAdminPersonnel();

  //Para controlar el formulario de user
  const [controlFormUser, setControlFormUser] = useState(false);

  //Para controlar de visualizar el formulario de cambio estado de usuario
  const [visibleFormStatus, setVisibleFormStatus] = useState(false);

  //Para saber que usuario se le va hacer el cambio
  const [changeUser, setChangeUser]=useState();

  return (
    <div className="grid grid-rows-2 ">
      <div className="justify-self-end row-span-2 m-2">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setControlFormUser(true)}
        >
          Nuevo usuario
        </Button>
      </div>
      <div>
        <TableUser
        setVisibleFormStatus={setVisibleFormStatus}
          loanding={loanding}
          dataUser={dataUser}
        />
      </div>
      <ModalFormUser
      setDataUser={setDataUser}
        controlFormUser={controlFormUser}
        setControlFormUser={setControlFormUser}
        dataRol={dataRol}
        dataEmployee={dataEmployee}
      />
      <ModalPasswordAndStatus
      changeUser={changeUser}
      setChangeUser={setChangeUser}
      setVisibleFormStatus={setVisibleFormStatus}
      visibleFormStatus={visibleFormStatus}
      />
    </div>
  );
}

export default ModuleUser;
