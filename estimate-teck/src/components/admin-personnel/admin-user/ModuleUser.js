import React, { useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TableUser from "./TableUser";
import ModalFormUser from "./ModalFormUser";
import ModalChangeStatus from "./ModalChangedStatus";
import ModalChangedRol from "./ModalChangedRol"
import useModuleAdminPersonnel from "../../../hooks/useModuleAdminPersonnel";
function ModuleUser() {

  const { dataEmployeeWithoutUser, setUpdateTableUser, dataRol, dataUser, setDataUser, loanding, setloanding } = useModuleAdminPersonnel();

  //Para controlar la visiblidad del  formulario de user
  const [controlFormUser, setControlFormUser] = useState(false);

  //Para controlar cuando se va a crear el usuario y cuando se va a restablecer la contraseña
  const [userResetPassowrd, setUserResetPassword] = useState(null)

  //Para controlar de visualizar el formulario de cambio estado de usuario
  const [visibleFormStatus, setVisibleFormStatus] = useState(false);

  const[visibleFormRol, setVisibleFormRol]= useState(false);

  //Para saber que usuario se le va hacer el cambio
  const [changeUser, setChangeUser] = useState();

  return (
    <div className="grid grid-rows-2">
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
          setUserResetPassword={setUserResetPassword}
          setloanding={setloanding}
          setVisibleFormStatus={setVisibleFormStatus}
          setVisibleFormRol={setVisibleFormRol}
          loanding={loanding}
          dataUser={dataUser}
          setChangeUser={setChangeUser}
          setControlFormUser={setControlFormUser}

        />
      </div>
      <ModalFormUser
        setUserResetPassword={setUserResetPassword}
        userResetPassowrd={userResetPassowrd}
        setloanding={setloanding}
        setDataUser={setDataUser}
        controlFormUser={controlFormUser}
        setControlFormUser={setControlFormUser}
        dataRol={dataRol}
        dataEmployeeWithoutUser={dataEmployeeWithoutUser}

      />
      <ModalChangeStatus
        setUpdateTableUser={setUpdateTableUser}
        changeUser={changeUser}
        setChangeUser={setChangeUser}
        setVisibleFormStatus={setVisibleFormStatus}
        visibleFormStatus={visibleFormStatus}
      />

      <div>
      <ModalChangedRol
        setUpdateTableUser={setUpdateTableUser}
        changeUser={changeUser}
        setChangeUser={setChangeUser}
        setVisibleFormRol={setVisibleFormRol}
        visibleFormRol={visibleFormRol}
      />

      </div>
      
    



    </div>
    
  );
}

export default ModuleUser;
