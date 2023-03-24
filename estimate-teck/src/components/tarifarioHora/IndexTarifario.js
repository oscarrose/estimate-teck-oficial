import React, { useEffect, useState,useCallback } from "react";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TableTarifario from "./TableTarifario";
import ModalFormTarifario from "./ModalFormTarifario";
import CallApi from "../../ServicesHttp/CallApi";

function IndexTarifario() {
  //Para controlar el formulario y tabla  de Tarifario
  const [controlFormTarifario, setControlFormTarifario] = useState({
    visible: false,
    dataEdit: null,
  });

  //Para la data de la tabla de Tarifario
  const [dataTarifario, setDataTarifario] = useState([]);

  /*Para saber cuando actualizar la tabla 
  luego de un cambio en los datos de algun Tarifario*/
  const [updateTableTarifario, setUpdateTableTarifario] = useState(false);

  //Para saber cuando se estan obteniendo los datos de la tabla de Tarifario
  const [loading, setLoanding] = useState(false);

  /**
   *Function para obtener los datos  para la tabla de Tarifario
   */
   const fetchDataTarifario = useCallback(async function () {
    setLoanding(true);
    await CallApi.get("TarifarioHoras/GetAllTarifarioHora")
      .then((res) => {
       
        setDataTarifario(res.data);
        setLoanding(false);
      })
      .catch((error) => {
        setLoanding(false);
        message.error("Error Interno", error.message);
      });
  }, []);

  useEffect(() => {
    fetchDataTarifario();
    
  }, [updateTableTarifario]);

  return (
    <div className="grid grid-rows-2 bg-white container mx-auto">
      <div className="justify-self-end row-span-2 m-2">
        <Button
          className="mr-10"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() =>
            setControlFormTarifario({
              ...controlFormTarifario,
              visible: true,
            })
          }
        >
          Nueva tarifa
        </Button>
      </div>

      <TableTarifario
        dataTarifario={dataTarifario}
        loading={loading}
        setControlFormTarifario={setControlFormTarifario}
        controlFormTarifario={controlFormTarifario}
      />

      <ModalFormTarifario
     
        key={controlFormTarifario.dataEdit}
        setUpdateTableTarifario={setUpdateTableTarifario}
        setDataTarifario={setDataTarifario}
        setControlFormTarifario={setControlFormTarifario}
        controlFormTarifario={controlFormTarifario}
      />
    </div>
  );
}

export default IndexTarifario;
