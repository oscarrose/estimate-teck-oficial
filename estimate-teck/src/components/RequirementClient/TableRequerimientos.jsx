import React from "react";
import { Button, Space, Table } from "antd";
import { EditOutlined } from "@ant-design/icons";

function TableRequerimientos({
    dataRequeriment,
    loading,
    setControlFormRequeriment,
    controlFormRequeriment,
}) {

    const columns = [
        {
            title: "Requerimiento de Usuario",
            dataIndex: "requisito",
        },

        {
            title: "Acciones",
            width: 100,
            render: (record) => (
                <Space size="middle">
                    <Button
                        type="link"
                        onClick={() => {
                            setControlFormRequeriment({
                                ...controlFormRequeriment,
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
                dataSource={dataRequeriment}
                loading={loading}
                rowKey={(record) => record.RequerimientoId}
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

export default TableRequerimientos;