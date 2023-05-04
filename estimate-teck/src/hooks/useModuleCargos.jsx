import { useState, useEffect, useCallback } from "react";
import { message } from "antd";
import CallApi from "../ServicesHttp/CallApi";

const useModuleCargos = () => {
  //Data para mostrar los datos en la table de empleado y en el select del

  const [dataCargos, setDataCargos] = useState([]);


  //Para saber si esta modificando la data de la tabla de cargo
  const [updateTableCargos, setUpdateTableCargos] = useState(false);

  //Para saber cuando termina la peticcion de responder
  const [loanding, setloanding] = useState(false);
  /**
   *Function para obtener los datos  para la tabla de Cargos
   */
  const fetchDataCargos = useCallback(async function () {
    setloanding(true);
    await CallApi.get("Cargos/GetAllCargos")
      .then((res) => {
        setDataCargos(res.data);
        setloanding(false);
      })
      .catch((error) => {
        setloanding(false);
        message.error("Error Interno", error);
      });
  }, []);

  useEffect(() => {
    fetchDataCargos();
  }, [updateTableCargos]);

  return {
    dataCargos,
    setDataCargos,
    loanding,
    setUpdateTableCargos
  };
};

export default useModuleCargos;