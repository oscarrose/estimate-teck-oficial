import React, { useState } from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Modal, Space, InputNumber, Select } from 'antd';
import useEstimate from '../../hooks/useEstimate';

const { Option } = Select;
function ParticipanteEstimacion({ detalleEstimacion }) {

    const { isModalOpen, setIsModalOpen } = useEstimate();

    console.log("rec", detalleEstimacion.viewEstimacionDetalle.totalProgramadores)
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
        console.log('Received values of form:', values);
    };
    return (

        <>

            <Modal title="Agregar los cargos para la estimación" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

                <Form
                    name="Participante_estimacion"
                    onFinish={onFinish}

                    autoComplete="off"
                >
                    <Form.List name="Participante">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space
                                        key={key}
                                        style={{
                                            display: 'flex',
                                            marginBottom: 8,
                                        }}
                                        align="baseline"
                                    >
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'CardoId']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'El cargo es requerido',
                                                },
                                            ]}
                                        >
                                            <InputNumber />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'cantidadPersona']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'La cantidad es requerida',
                                                },
                                            ]}
                                        >
                                            <InputNumber min={1} />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                ))}
                                {fields.length < detalleEstimacion.viewEstimacionDetalle.totalProgramadores ? (<Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Agregar participante
                                    </Button>
                                </Form.Item>) : null
                                }
                            </>
                        )}
                    </Form.List>
                    {/* <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item> */}
                </Form>
            </Modal>
        </>

    )
}

export default ParticipanteEstimacion