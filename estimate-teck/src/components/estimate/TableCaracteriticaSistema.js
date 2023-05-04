import React from 'react'
import { Table } from 'antd';

function TableCaracteriticaSistema({ detalleEstimacion }) {

    const columns = [
        {
            title: 'Caracteristica',
            dataIndex: 'caracteristica',
            key: 'caracteristica',
        },
        {
            title: 'Puntaje',
            dataIndex: 'puntaje',
            key: 'puntaje',
        },
    ];


    return (
        <>
        <h1 className="text-xl">Características generales del sistema </h1>
            <Table columns={columns} dataSource={detalleEstimacion.viewCaracteristicaSistema} />
        </>

    )
}

export default TableCaracteriticaSistema