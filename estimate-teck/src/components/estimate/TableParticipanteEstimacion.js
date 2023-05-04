import React from 'react'
import { Table } from 'antd';
function TableParticipanteEstimacion({ detalleEstimacion }) {


    const columns = [
        {
            title: 'Cargo',
            dataIndex: 'cargo',
            key: 'cargo',
            
        },
        {
            title: 'Cantidad persona',
            dataIndex: 'cantidadPersona',
            key: 'cantidadPersona',
        }      

    ];


    return (
        <>
        <h1 className="text-xl">Cargo participante en la estimación </h1>
            <Table columns={columns} dataSource={detalleEstimacion.viewParticipanteEstimacion} />
        </>

    )
}

export default TableParticipanteEstimacion