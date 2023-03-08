import React, { useEffect, useState,useCallback } from "react";
import { Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TableClient from "./TableClient";
import ModalFormClient from "./ModalFormClient";
import CallApi from "../../ServicesHttp/CallApi";

function IndexAdminClient() {
  //Para controlar el formulario y tabla  de cliente
  const [controlFormClient, setControlFormClient] = useState({
    visible: false,
    dataEdit: null,
  });

  //Para la data de la tabla de cliente
  const [dataClient, setDataClient] = useState([]);

  /*Para saber cuando actualizar la tabla 
  luego de un cambio en los datos de algun cliente*/
  const [updateTableClient, setUpdateTableClient] = useState(false);

  //Para saber cuando se estan obteniendo los datos de la tabla de clente
  const [loading, setLoanding] = useState(false);

  /**
   *Function para obtener los datos  para la tabla de empleados
   */
   const fetchDataClient = useCallback(async function () {
    setLoanding(true);
    await CallApi.get("Client/GetAllClient")
      .then((res) => {
        setDataClient(res.data);
        setLoanding(false);
      })
      .catch((error) => {
        setLoanding(false);
        message.error("Error Interno", error.message);
      });
  }, []);

  useEffect(() => {
    fetchDataClient();
  }, [updateTableClient]);

  return (
    <div className="grid grid-rows-2 bg-white container mx-auto">
      <div className="justify-self-end row-span-2 m-2">
        <Button
          className="mr-10"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() =>
            setControlFormClient({
              ...controlFormClient,
              visible: true,
            })
          }
        >
          Nuevo cliente
        </Button>
      </div>

      <TableClient
        dataClient={dataClient}
        loading={loading}
        setControlFormClient={setControlFormClient}
        controlFormClient={controlFormClient}
      />

      <ModalFormClient
     
        key={controlFormClient.dataEdit}
        setUpdateTableClient={setUpdateTableClient}
        setDataClient={setDataClient}
        setControlFormClient={setControlFormClient}
        controlFormClient={controlFormClient}
      />
    </div>
  );
}

export default IndexAdminClient;
