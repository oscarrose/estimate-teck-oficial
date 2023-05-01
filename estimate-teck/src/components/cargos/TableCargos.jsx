import React from "react";
import { Button, Space, Table } from "antd";
import { EditOutlined } from "@ant-design/icons";

function TableCargos({
    dataCargos,
    loading,
    setControlFormCargos,
    controlFormCargos,
}) {

    const columns = [
        {
            title: "Cargo",
            dataIndex: "nombreCargo",
        },

        {
            title: "Tarifa/Hora USD$",
            dataIndex: "salarioHora",
            with: 10

        },
        {
            title: "Descripción",
            dataIndex: "descripcion",
            with: 20

        },
        {
            title: "Creado Por",
            dataIndex: "creadoPor",
            with: 20

        },
        {
            title: "Fecha de creación",
            dataIndex: "fechaCreacion",
            with: 20

        },


        {
            title: "Acciones",
            width: 100,
            render: (record) => (
                <Space size="middle">
                    <Button
                        type="link"
                        onClick={() => {
                            setControlFormCargos({
                                ...controlFormCargos,
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
                dataSource={dataCargos}
                loading={loading}
                rowKey={(record) => record.cargoId}
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

export default TableCargos;
