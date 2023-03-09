import React from "react";
import { Button, Space, Table, message, Popconfirm } from "antd";
import { PauseOutlined, ReloadOutlined } from "@ant-design/icons";
import CallApi from "../../../ServicesHttp/CallApi";
function TableUser({
  dataUser,
  loanding,
  setVisibleFormStatus,
  setChangeUser,
  setloanding
}) {


  //Para restablecer la contraseña
  const resetPassword = (id) => {
    setloanding(true);
    CallApi.patch(`Usuarios/resetPasswordUser/${id}`
    ).then(() => {
      message.success("Contraseña restablecida")
      setloanding(false);
    }).catch((error) => {
      setloanding(false);
      message.error(error.message);
    });
  };


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
            onConfirm={() => resetPassword(record.usuarioId)}

            okText="Yes"
            cancelText="No"
          >
            <ReloadOutlined />
          </Popconfirm>


        </Space>
      ),
    },
  ];



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
