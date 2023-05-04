import React from 'react'
import { Table } from 'antd';
function TableDetalleDePuntoFuncionAjustado({ detalleEstimacion }) {


    const columns = [
        {
            title: 'Tipo componente',
            dataIndex: 'tipoComponente',
            key: 'tipoComponente',
        },
        {
            title: 'Complejidad baja',
            dataIndex: 'baja',
            key: 'baja',
        },
        {
            title: 'Complejidad media',
            dataIndex: 'media',
            key: 'media',
        },

        {
            title: 'Complejidad alta',
            dataIndex: 'alta',
            key: 'alta',
        },

        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
        },

    ];


    return (
        <>
        <h1 className="text-xl">Detalle de puntos funcion ajustados </h1>
            <Table columns={columns} dataSource={detalleEstimacion.viewPuntoFuncionAjustado} />
        </>

    )
}

export default TableDetalleDePuntoFuncionAjustado