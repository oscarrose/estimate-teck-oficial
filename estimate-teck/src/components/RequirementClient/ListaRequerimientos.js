import React from 'react';
import { Divider, List, Table, Card, Spin } from 'antd';

function ListaRequerimentos({ dataRequeriment, loading }) {


    //   const requerimiento = [

    //     {

    //       title:"requerimientoId" ,

    //       "proyectoId": 0,

    //       "tipoRequerimientoId": 0,

    //       "usuarioId": 0,

    //       "requisito": "El sistema permitirá depositar dinero desde un cajero automático",

    //       "requisitoSf": [

    //         {

    //           "id": 1,

    //           "requerimientoSf": "El sistema debe proporcionar una interfaz para la autenticación de usuario antes de realizar el depósito"

    //         },

    //         {

    //           "id": 2,

    //           "requerimientoSf": "El sistema debe permitir la selección de la cantidad de dinero a depositar"

    //         },

    //         {

    //           "id": 3,

    //           "requerimientoSf": "El sistema debe proporcionar una confirmación de la transacción realizada"

    //         }

    //       ]

    //     },


    //   ];
    return (
        <>
            <Spin size='large' spinning={loading}>
                <List

                    grid={{ gutter: 16, column: 1 }}

                    dataSource={dataRequeriment}

                    renderItem={requisito => (

                        <List.Item>

                            <Card title={requisito.requisito}>

                                <List

                                    dataSource={requisito.requisitoSf}

                                    renderItem={requerimientoSf => (

                                        <List.Item>

                                            {requerimientoSf.requerimientoSf}

                                        </List.Item>

                                    )}

                                />

                            </Card>

                        </List.Item>

                    )}

                />
            </Spin>
        </>

    );

}

export default ListaRequerimentos;