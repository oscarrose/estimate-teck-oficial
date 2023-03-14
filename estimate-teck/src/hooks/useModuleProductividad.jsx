import { useState, useEffect, useCallback } from "react";
import { message } from "antd";
import CallApi from "../ServicesHttp/CallApi";

const useModuleProductividad = () => {
  //Data para mostrar los datos en la table de empleado y en el select del

  const [dataProductividad, setDataProductividad] = useState([]);


  //Para saber si esta modificando la data de la tabla de empleado
  const [updateTableProductividad, setUpdateTableProductividad] = useState(false);

  //Para saber cuando termina la peticcion de responder
  const [loanding, setloanding] = useState(false);
  /**
   *Function para obtener los datos  para la tabla de empleados
   */
  const fetchDataProductividad = useCallback(async function () {
    setloanding(true);
    await CallApi.get("ProductividadPuntoFuncions/GetAllProductividad")
      .then((res) => {
        setDataProductividad(res.data);
        setloanding(false);
      })
      .catch((error) => {
        setloanding(false);
        message.error("Error Interno", error);
      });
  }, []);

  useEffect(() => {
    fetchDataProductividad();
  }, [updateTableProductividad]);

  return {
    dataProductividad,
    setDataProductividad,
    loanding,
    setUpdateTableProductividad
  };
};

export default useModuleProductividad;
