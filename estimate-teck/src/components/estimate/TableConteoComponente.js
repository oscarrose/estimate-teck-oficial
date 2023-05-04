import React from 'react'
import { Table } from 'antd';
function TableConteoComponente({ detalleEstimacion }) {


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

    ];


    return (
        <>
        <h1 className="text-xl">Conteo de los componentes </h1>
            <Table columns={columns} dataSource={detalleEstimacion.viewConteoTipoComponente} />
        </>

    )
}

export default TableConteoComponente