import { useState, useEffect, useCallback } from "react";
import { message } from "antd";
import CallApi from "../ServicesHttp/CallApi";

const useModuleAdminPersonnel = () => {
  //Data para mostrar los datos en la table de empleado y en el select del

  const [dataEmployee, setDataEmployee] = useState([]);


  //Para saber si esta modificando la data de la tabla de empleado
  const [updateTableEmployee, setUpdateTableEmployee] = useState(false);

  //Para saber cuando termina la peticcion de responder
  const [loanding, setloanding] = useState(false);
  /**
   *Function para obtener los datos  para la tabla de empleados
   */
  const fetchDataEmployee = useCallback(async function () {
    setloanding(true);
    await CallApi.get("Empleados/GetAllEmployee")
      .then((res) => {
        setDataEmployee(res.data);
        setloanding(false);
      })
      .catch((error) => {
        setloanding(false);
        message.error("Error Interno", error);
      });
  }, []);

  useEffect(() => {
    fetchDataEmployee();
  }, [updateTableEmployee]);

  return {
    dataEmployee,
    setDataEmployee,
    loanding,
    setUpdateTableEmployee
  };
};

export default useModuleAdminPersonnel;
