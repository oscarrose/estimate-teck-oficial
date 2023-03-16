import React from "react";
import { Button, Space, Table } from "antd";
import { EditOutlined } from "@ant-design/icons";

function TableClient({
  dataClient,
  loading,
  setControlFormClient,
  controlFormClient,
}) {

  const columns = [
    {
      title: "Nombre cliente",
      dataIndex: "nombreCliente",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Tipo Cliente",
      dataIndex: ['tipo','nombreTipoCliente'],
      width: 127,
    },
   
    {
      title: "Tipo de identificación",
      dataIndex: "tipoIdentificacion",
      width: 127,
    },
    {
      title: "Identificación",
      dataIndex: "identificacion",
      width: 127,
    },
    {
      title: "Num. concacto",
      children:[
      {
        title: "Celular",
        dataIndex: "celular",
        width: 110,
      },
      {
        title: "Telefono ",
        dataIndex: "telefonoResidencial",
        width: 110,
      },
      
    ]
    },
    {
      title: "País",
      dataIndex: "pais",
     
    },
    {
      title: "Ciudad",
      dataIndex: "estado",
     
    },
  
    {
      title: "Dirección",
      dataIndex: "direccion",
      width: 127,
    },
    {
      title: "Fecha creación",
      dataIndex: "fechaCreacion",
      width: 127,
    },
    {
      
      render: (record) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => {
              setControlFormClient({
                ...controlFormClient,
                visible: true,
                dataEdit: record,
              });
            }}
          >
            <EditOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataClient}
        loading={loading}
        rowKey={(record) => record.clientId}
        pagination={{
          pageSize: 10,
        }}
        scroll={{
          y: 360,
        }}
      />
    </div>
  );
}

export default TableClient;
