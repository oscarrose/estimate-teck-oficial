import React from "react";
import { Button, Space, Table } from "antd";
import { EditOutlined } from "@ant-design/icons";

function TableTarifario({
  dataTarifario,
  loading,
  setControlFormTarifario,
  controlFormTarifario,
}) {

  const columns = [
    {
      title: "Cargo",
      dataIndex: "cargoName",
    },
    {
      title: "Empleado",
      dataIndex: "empleadoName",
      with:8
    },
    {
      title: "Tarifa/Hora",
      dataIndex: "montoTarifa",
      with:10
   
    },
    {
      title: "Fecha creación",
      dataIndex: "fechaCreacion",
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
              setControlFormTarifario({
                ...controlFormTarifario,
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
        dataSource={dataTarifario}
        loading={loading}
        rowKey={(record) => record.TarifarioId}
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

export default TableTarifario;
