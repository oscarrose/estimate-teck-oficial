import React from "react";
import { Button, Space, Table, Tooltip, Popconfirm } from "antd";
import { PauseOutlined, ReloadOutlined,UserSwitchOutlined } from "@ant-design/icons";

function TableUser({
  dataUser,
  loanding,
  setVisibleFormStatus,
  setVisibleFormRol,
  setChangeUser,
  setUserResetPassword,
  setControlFormUser,
  SetChangeRol
}) {



  const handleResetPassword=(value)=>{
    setUserResetPassword(value)
    setControlFormUser(true)
  }

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
      render: (record) => (
        <Space size="middle">
          <Tooltip title="Cambiar estado">
            <Button
              type="link"
              onClick={() => {

                setVisibleFormStatus(true);
                setChangeUser(record.usuarioId);
              }}
            >
              <PauseOutlined />
            </Button>

          </Tooltip>

          <Tooltip title="Restablecer constraseña">
            <Button
            type="link"
            onClick={()=>handleResetPassword(record)}
            >
              <ReloadOutlined />
            </Button>
          </Tooltip>

{           <Tooltip title="Cambiar rol">
            <Button
              type="link"
              onClick={() => {

                setVisibleFormRol(true);
                setChangeUser(record.usuarioId);
              }}
            >
             <UserSwitchOutlined />
            </Button>

          </Tooltip> }



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
