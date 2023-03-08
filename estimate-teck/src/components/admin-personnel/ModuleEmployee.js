import React, { useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TableEmpoyee from "./TableEmpoyee";
import ModalFormEmployee from "./ModalFormEmployee";
import useModuleAdminPersonnel from "../../hooks/useModuleAdminPersonnel";

function ModuloEmployee() {
  const [modalFormEmployee, setModalFormEmployee] = useState(false);

  const { setDataEmployee, dataEmployee, loanding,setUpdateTableEmployee } = useModuleAdminPersonnel();

  //Para saber a que empleado de le va a modificar la data
  const [editEmployee, setEditEmployee] = useState(null);

  return (
    <div className="grid grid-rows-2 ">
      <div className="justify-self-end row-span-2 m-2">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModalFormEmployee(true)}
        >
          Nuevo empleado
        </Button>
      </div>
      <div>
        <TableEmpoyee
          setModalFormEmployee={setModalFormEmployee}
          setEditEmployee={setEditEmployee}
          dataEmployee={dataEmployee}
          loanding={loanding}
        />
      </div>
      <ModalFormEmployee
      setUpdateTableEmployee={setUpdateTableEmployee}
       setEditEmployee={setEditEmployee}
        editEmployee={editEmployee}
        setDataEmployee={setDataEmployee}
        modalFormEmployee={modalFormEmployee}
        setModalFormEmployee={setModalFormEmployee}
      />
    </div>
  );
}

export default ModuloEmployee;
