import React from 'react'
import { Table } from 'antd';
function TablaParametroEconomico({ detalleEstimacion }) {


    const columns = [
        {
            title: 'ITBIS',
            dataIndex: 'itbis',
            className: 'column-money',
            key: 'itbis',
           
        },
        {
            title: 'Costo de soporte',
            dataIndex: 'costoSoporte',
            key: 'costoSoporte',
        },

        {
            title: 'Costo de implementación',
            dataIndex: 'costoImplementacion',
            key: 'costoImplementacion',
        },
        {
            title: 'Fecha creación',
            dataIndex: 'fechaCreacion',
            key: 'fechaCreacion',
        }


    ];


    return (
        <>
            <h1 className="text-xl">Detalle de parametros económicos </h1>
            <Table columns={columns} dataSource={detalleEstimacion.viewParametroEconomico} />
        </>

    )
}

export default TablaParametroEconomico