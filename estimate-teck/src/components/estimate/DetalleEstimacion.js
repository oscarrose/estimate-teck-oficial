import React, { useState, useEffect } from 'react'
import { Statistic, Card, Button, Row, Col, Descriptions, Divider, message } from 'antd';
import { CalendarOutlined, DollarOutlined, TeamOutlined, FieldTimeOutlined } from "@ant-design/icons";
import TableComponentFuncional from './TableComponentFuncional';


function DetalleEstimacion({ detalleEstimacion }) {

    // const { detalleEstimacion } = useEstimate();


    console.log("data2", detalleEstimacion.viewEstimacion

    )

    const data = [
        {
            "Estimacion_Id": 1,
            "Esfuerzo_total": 148.06,
            "Duracion_horas": 74.00,
            "Duracion_dias": 9.00,
            "Duracion_mes": 0.41,
            "Costo_bruto_estimado": 0.00,
            "Costo_total": 0.00
        }
    ];

    const dataDetalle = [
        {
            estimacionId: detalleEstimacion.viewEstimacion,
            "Esfuerzo_total": 148.06,
            "Duracion_horas": 74.00,
            "Duracion_dias": 9.00,
            "Duracion_mes": 0.41,
            "Costo_bruto_estimado": 0.00,
            "Costo_total": 0.00
        }
    ];


    return (
        <>
            <div className='flex m-10'>
                <Card bordered={false} className="flex-1">
                    <Statistic
                        title="Esfuerzo total"
                        value={55}
                        suffix="H/H"
                        valueStyle={{
                            color: '#ff6600',
                        }}
                    />
                </Card>

                <Card bordered={false} className="flex-1">
                    <Statistic
                        title="Duración en horas"
                        value={data[0].Duracion_horas}
                        prefix={<FieldTimeOutlined />
                        }
                        valueStyle={{
                            color: '#008000',
                        }}
                        suffix="Horas" />
                </Card>
                <Card bordered={false} className="flex-1">
                    <Statistic
                        title="Duración en dias"
                        value={data[0].Duracion_dias}
                        prefix={<CalendarOutlined />
                        }
                        valueStyle={{
                            color: '#FFA500',
                        }}
                        suffix="Dias" />
                </Card>

                <Card bordered={false} className="flex-1">
                    <Statistic
                        title="Duración en mes"
                        value={data[0].Duracion_mes}
                        prefix={<CalendarOutlined />
                        }
                        valueStyle={{
                            color: '#FF6347',
                        }}
                        suffix="Mes" />
                </Card>

            </div>

            <div className='flex m-10'>

                <Card bordered={false} className="flex-1">
                    <Statistic
                        title="Numero de programadores"
                        value={3}
                        prefix={<TeamOutlined />
                        }
                        valueStyle={{
                            color: '#3f8600',
                        }}
                        suffix="US$" />

                </Card>
                <Card bordered={false} className="flex-1">
                    <Statistic
                        title="Costo bruto estimado"
                        value={data[0].Costo_bruto_estimado}
                        prefix={<DollarOutlined />
                        }
                        valueStyle={{
                            color: '#3f8600',
                        }}
                        suffix="US$" />
                    <Button
                        className="bg-black border-none shadow-sm hover:bg-slate-700 text-white font-sans py-1.5 px-2.5  rounded inline-flex items-center"
                        type="primary"
                    >
                        Estimar costo bruto
                    </Button>
                </Card>

                <Card bordered={false} className="flex-1">
                    <Statistic
                        title="Costo total estimado"
                        value={data[0].Costo_total}
                        prefix={<DollarOutlined />
                        }
                        valueStyle={{
                            color: '#3f8600',
                        }}
                        suffix="US$" />
                    <Button
                        className="bg-black border-none shadow-sm hover:bg-slate-700 text-white font-sans py-1.5 px-2.5  rounded inline-flex items-center"
                        type="primary"
                    >
                        Parámetros económicos
                    </Button>
                </Card>
            </div>

            <Descriptions title="Información de estimación">
                <Descriptions.Item label="Id estimación">{detalleEstimacion.viewEstimacion.estimacionId ?? 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Id proyecto">{detalleEstimacion.viewEstimacion.proyectoId ?? 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Estado">
                    {detalleEstimacion.viewEstimacion.estado
                        ?? 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Creado por"> {detalleEstimacion.viewEstimacion.estado
                        ?? 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Fecha estimación">12-22-33</Descriptions.Item>
                <Descriptions.Item label="Factor de ajuste">1.02</Descriptions.Item>
                <Descriptions.Item label="Total de puntos de función sin ajustar(PFSA)">
                    45
                </Descriptions.Item>

                <Descriptions.Item label="Total de Puntos de función ajustados(PFA)">
                    45
                </Descriptions.Item>
            </Descriptions>
            <Divider />
            <TableComponentFuncional />
        </>
    )
}

export default DetalleEstimacion