import React, { useEffect, useState,useCallback } from "react";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TableCargos from "./TableCargos";
import ModalFormCargos from "./ModalFormCargos";
import CallApi from "../../ServicesHttp/CallApi";

function IndexCargos() {
  //Para controlar el formulario y tabla  de Cargos
  const [controlFormCargos, setControlFormCargos] = useState({
    visible: false,
    dataEdit: null,
  });

  //Para la data de la tabla de Cargos
  const [dataCargos, setDataCargos] = useState([]);

  /*Para saber cuando actualizar la tabla 
  luego de un cambio en los datos de algun Cargos*/
  const [updateTableCargos, setUpdateTableCargos] = useState(false);

  //Para saber cuando se estan obteniendo los datos de la tabla de Cargos
  const [loading, setLoanding] = useState(false);

  /**
   *Function para obtener los datos  para la tabla de Cargos
   */
   const fetchDataCargos = useCallback(async function () {
    setLoanding(true);
    await CallApi.get("Cargos/GetAllCargos")
      .then((res) => {
       
        setDataCargos(res.data);
        setLoanding(false);
      })
      .catch((error) => {
        setLoanding(false);
        message.error("Error Interno", error.message);
      });
  }, []);

  useEffect(() => {
    fetchDataCargos();
    
  }, [updateTableCargos]);

  return (
    <div className="grid grid-rows-2 bg-white container mx-auto">
      <div className="justify-self-end row-span-2 m-2">
        <Button
          className="mr-10"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() =>
            setControlFormCargos({
              ...controlFormCargos,
              visible: true,
            })
          }
        >
          Nuevo cargo
        </Button>
      </div>

      <TableCargos
        dataCargos={dataCargos}
        loading={loading}
        setControlFormCargos={setControlFormCargos}
        controlFormCargos={controlFormCargos}
      />

      <ModalFormCargos
     
        key={controlFormCargos.dataEdit}
        setUpdateTableCargos={setUpdateTableCargos}
        setDataCargos={setDataCargos}
        setControlFormCargos={setControlFormCargos}
        controlFormCargos={controlFormCargos}
      />
    </div>
  );
}

export default IndexCargos;