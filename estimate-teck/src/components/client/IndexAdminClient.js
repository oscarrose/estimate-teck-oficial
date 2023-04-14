import React, { useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TableClient from "./TableClient";
import ModalFormClient from "./ModalFormClient";
import useClient from "../../hooks/useClient";

function IndexAdminClient() {
  //Para controlar el formulario y tabla  de cliente
  const [controlFormClient, setControlFormClient] = useState({
    visible: false,
    dataEdit: null,
  });

  const {dataClient,loading,setUpdateTableClient,setDataClient}=useClient();

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