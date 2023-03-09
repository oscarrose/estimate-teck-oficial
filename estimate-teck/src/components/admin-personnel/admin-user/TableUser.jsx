import React from "react";
import { Button, Space, Table, message, Popconfirm } from "antd";
import { PauseOutlined, ReloadOutlined } from "@ant-design/icons";
function TableUser({
  dataUser,
  loanding,
  setVisibleFormStatus,
  setChangeUser
}) {
  const columns = [
    {
      title: "Empleado",
      dataIndex: "empleado",
    },
    {
      title: "Email",
      dataIndex: "emailUsuario"
    },
    {
      title: "Estado",
      dataIndex: "estadoUsuario",

    },
    {
      title: "Rol",
      dataIndex: "rol",

    },
    {
      title: "Fecha creación",
      dataIndex: "fechaCreacion",
      width: 127,
    },
    {
      title: "Acciones",

      render: (record) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => {

              setVisibleFormStatus(true);
              setChangeUser(record.usuarioId);
            }}
          >
            <PauseOutlined />
          </Button>

          <Popconfirm
            title="Restablecer constraseña"
            description="Estás segura de restablecer esta contraseña?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <ReloadOutlined />
          </Popconfirm>


        </Space>
      ),
    },
  ];

  const confirm = (e) => {
    console.log(e);
    message.success('Click on Yes');
  };
  const cancel = (e) => {
    console.log(e);
    message.error('Click on No');
  };
  return (
    <div>
      <Table
        columns={columns}
        dataSource={dataUser}
        loading={loanding}
        rowKey={(record) => record.usuarioId}
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

export default TableUser;
