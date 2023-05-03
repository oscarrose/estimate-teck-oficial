import React from 'react'
import {Table  } from 'antd';
function TableComponentFuncional({ detalleEstimacion }) {


    const columns = [
        {
            title: 'Requerimiento software',
            dataIndex: 'requerimientoSw',
            key: 'requerimientoSw',
        },
        {
            title: 'Tipo componente',
            dataIndex: 'tipoComponente',
            key: 'tipoComponente',
        },
        {
            title: 'Complejidad',
            dataIndex: 'complejidad',
            key: 'complejidad',
        },

    ];


    return (
        <>
        <h1 className="text-xl">Clasificación de componentes </h1>
            <Table columns={columns} dataSource={detalleEstimacion.viewComponenteFuncional} />
        </>

    )
}

export default TableComponentFuncional