import React, { useEffect, useState, useCallback } from "react";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TableProductividad from "./TableProductividad";
import ModalFormProductividad from "./ModalFormProductividad";
import CallApi from "../../ServicesHttp/CallApi";

function IndexProductividad() {
  //Para controlar el formulario y tabla  de productividad
  const [controlFormProductividad, setControlFormProductividad] = useState({
    visible: false,
    dataEdit: null,
  });

  //Para la data de la tabla de productividad
  const [dataProductividad, setDataProductividad] = useState([]);

  /*Para saber cuando actualizar la tabla 
  luego de un cambio en los datos de algun Productividad*/
  const [updateTableProductividad, setUpdateTableProductividad] = useState(false);

  //Para saber cuando se estan obteniendo los datos de la tabla de productividad
  const [loading, setLoanding] = useState(false);

  /**
   *Function para obtener los datos  para la tabla de productividad
   */
  const fetchDataProductividad = useCallback(async function () {
    setLoanding(true);
    await CallApi.get("ProductividadPuntoFuncions/GetAllProductividad")
      .then((res) => {
        setDataProductividad(res.data);
        setLoanding(false);
      })
      .catch((error) => {
        setLoanding(false);
        message.error("Error Interno", error.message);
      });
  }, []);

  useEffect(() => {
    fetchDataProductividad();

  }, [updateTableProductividad]);

  return (
    <div className="grid grid-rows-2 bg-white container mx-auto">
      <div className="justify-self-end row-span-2 m-2">
        <Button
          className="mr-10"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() =>
            setControlFormProductividad({
              ...controlFormProductividad,
              visible: true,
            })
          }
        >
          Nueva plataforma
        </Button>
      </div>

      <TableProductividad
        dataProductividad={dataProductividad}
        loading={loading}
        setControlFormProductividad={setControlFormProductividad}
        controlFormProductividad={controlFormProductividad}
      />

      <ModalFormProductividad

        key={controlFormProductividad.dataEdit}
        setUpdateTableProductividad={setUpdateTableProductividad}
        setDataProductividad={setDataProductividad}
        setControlFormProductividad={setControlFormProductividad}
        controlFormProductividad={controlFormProductividad}
      />
    </div>
  );
}

export default IndexProductividad;
