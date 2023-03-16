import React from "react";
import { Button, Space, Table } from "antd";
import { EditOutlined } from "@ant-design/icons";

function TableProductividad({
  dataProductividad,
  loading,
  setControlFormProductividad,
  controlFormProductividad,
}) {

  const columns = [
    {
      title: "Nombre de la plataforma",
      dataIndex: "nombrePlataforma",
    },
    {
      title: "Nivel bajo",
      dataIndex: "nivelBajo",
      with:8
    },
    {
      title: "Nivel medio",
      dataIndex: "nivelMedio",
      with:10
   
    },
    {
      title: "Nivel alto",
      dataIndex: "nivelAlto",
      with:10
     
    },
    {
      title: "Creado por",
      dataIndex: "empleado",
    },

    {
      title: "Fecha creación",
      dataIndex: "fechaCreacion",
      with:20

    },
    {
      title: "Estado",
      dataIndex: "estado",
      with:20

    },

    {
      title: "Acciones",
      width: 100,
      render: (record) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => {
              setControlFormProductividad({
                ...controlFormProductividad,
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
        dataSource={dataProductividad}
        loading={loading}
        rowKey={(record) => record.productividadId}
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

export default TableProductividad;
