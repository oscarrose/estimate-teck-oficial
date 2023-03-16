import React from "react";
import { Button, Space, Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
function TableEmpoyee({
  setModalFormEmployee,
  dataEmployee,
  loanding,
  setEditEmployee,
}) {
  
  const columns = [
    {
      title: "Nombre",
      render: ({ nombre, apellido }) => (
        <p>{`${nombre} ${apellido}`}</p>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Identificación",
      dataIndex: "identificacion",
      width: 127,
    },
    {
      title: "Estado",
      dataIndex: "estado",
      width: 90
    },
    {
      title: "Cargo",
      dataIndex: "cargo",
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
      title: "Provincia",
      dataIndex: "provincia",
     
    },
    {
      title: "Dirección",
      dataIndex: "direccion",
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
              setEditEmployee(record);
              setModalFormEmployee(true);
            }}
          >
            <EditOutlined />
          </Button>
        </Space>
      ),
    },
  ].filter((item) => !item.hidden);
  return (
    <div >
      <Table
      
        columns={columns}
        dataSource={dataEmployee}
        loading={loanding}
        rowKey={(record) => record.idEmpleado}
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

export default TableEmpoyee;
