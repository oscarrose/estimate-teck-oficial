import React, { useState, useEffect } from 'react'
import { Statistic, Card, Button, Row, Col, Descriptions, Divider, message } from 'antd';
import { CalendarOutlined, DollarOutlined, TeamOutlined, FieldTimeOutlined } from "@ant-design/icons";
import TableComponentFuncional from './TableComponentFuncional';
import useEstimate from '../../hooks/useEstimate';

function DetalleEstimacion({ detalleEstimacion }) {

    const { isModalOpen, setIsModalOpen } = useEstimate();


    console.log("data2", detalleEstimacion.viewEstimacionDetalle

    )

    return (
        <>
            <div className='flex m-10'>
                <Card bordered={false} className="flex-1">
                    <Statistic
                        title="Esfuerzo total"
                        value={detalleEstimacion.viewEstimacionDetalle.esfuerzoTotal ?? 'N/A'}
                        suffix="H/H"
                        valueStyle={{
                            color: '#ff6600',
                        }}
                    />
                </Card>

                <Card bordered={false} className="flex-1">
                    <Statistic
                        title="Duración en horas"
                        value={detalleEstimacion.viewEstimacionDetalle.duracionHoras ?? 'N/A'}
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
                        value={detalleEstimacion.viewEstimacionDetalle.duracionDias ?? 'N/A'}
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
                        value={detalleEstimacion.viewEstimacionDetalle.duracionMes ?? 'N/A'}
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
                        value={detalleEstimacion.viewEstimacionDetalle.totalProgramadores ?? 'N/A'}
                        prefix={<TeamOutlined />
                        }
                        valueStyle={{
                            color: '#3f8600',
                        }}
                        suffix="" />

                </Card>
                <Card bordered={false} className="flex-1">
                    <Statistic
                        title="Costo bruto estimado"
                        value={detalleEstimacion.viewEstimacionDetalle.costoBrutoEstimado ?? 'N/A'}
                        prefix={<DollarOutlined />
                        }
                        valueStyle={{
                            color: '#3f8600',
                        }}
                        suffix="US$" />
                    <Button
                        className="bg-black border-none shadow-sm hover:bg-slate-700 text-white font-sans py-1.5 px-2.5  rounded inline-flex items-center"

                        onClick={() => setIsModalOpen(true)}
                    >
                        Estimar costo bruto
                    </Button>
                </Card>

                <Card bordered={false} className="flex-1">
                    <Statistic
                        title="Costo total estimado"
                        value={detalleEstimacion.viewEstimacionDetalle.costoTotal ?? 'N/A'}
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
                <Descriptions.Item label="Creado por"> {detalleEstimacion.viewEstimacion.creadoPor
                    ?? 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Fecha estimación">
                    {detalleEstimacion.viewEstimacion.fechaCreacion
                        ?? 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item label="Factor de ajuste">

                    {detalleEstimacion.viewEstimacion.factorAjuste
                        ?? 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item label="Total de puntos de función sin ajustar(PFSA)">
                    {detalleEstimacion.viewEstimacion.totalPuntoFuncionSinAjustar
                        ?? 'N/A'}
                </Descriptions.Item>

                <Descriptions.Item label="Total de Puntos de función ajustados(PFA)">
                    {detalleEstimacion.viewEstimacion.totalPuntoFuncionAjustado
                        ?? 'N/A'}
                </Descriptions.Item>
            </Descriptions>
            <Divider />
            <TableComponentFuncional />
        </>
    )
}

export default DetalleEstimacion