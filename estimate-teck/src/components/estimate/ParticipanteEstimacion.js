import React, { useState } from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Spin, Form, Modal, Space, InputNumber, Select, message } from 'antd';
import useEstimate from '../../hooks/useEstimate';
import useModuleCargos from "../../hooks/useModuleCargos";
import CallApi from '../../ServicesHttp/CallApi';
const { Option } = Select;
function ParticipanteEstimacion({ detalleEstimacion }) {

    const { setUpdateDetalleEstimacion, setLoandingEstimacion,
        isModalOpen, setIsModalOpen } = useEstimate();
    const { dataCargos } = useModuleCargos();

    const [form] = Form.useForm();

    const onReset = () => {
        form.resetFields();
    };


    const addParticipanteEstimacion = async (values) => {
        setLoandingEstimacion(true)
        const newData = values.map((item) => ({
            ...item,
            'estimacionId': detalleEstimacion.viewEstimacion.estimacionId
        }));
        const newVaues = {
            Listparticipantes: newData,
            EsfuerzoTotal: detalleEstimacion.viewEstimacionDetalle.esfuerzoTotal
        }

        await CallApi.post("Estimacions/CalcularCostoBruto", newVaues)
            .then(() => {
                setUpdateDetalleEstimacion((prevData) => !prevData);
                handleCancel();
                message.success("Costo bruto estimado correctamente");

            })
            .catch((error) => {
                message.error(error.message);
                setLoandingEstimacion(false)
            });
    }


    const handleOk = () => {
        form.validateFields().then(async (values) => {

            let count = values.Participante.reduce((contador, item) => contador + item.cantidadPersona, 0);

            const programadoresEsperados = detalleEstimacion.viewEstimacionDetalle.totalProgramadores;
            if (count !== programadoresEsperados) {
                message.error(`La cantidad de programadores especificados deben ser igual a ${programadoresEsperados}`);
            } else {
                addParticipanteEstimacion(values.Participante)
            }

        })
        // setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        onReset();
    };

    const onFinish = (values) => {
        console.log('Received values of form:', values);
    };
    return (
        <>
            <Modal title="Agregar los cargos para la estimación" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

                <Form
                    name="Participante_estimacion"
                    // onFinish={onFinish}
                    form={form}
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
                                            name={[name, 'CargoId']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'El cargo es requerido',
                                                },
                                            ]}
                                        >
                                            <Select placeholder=" Seleccione el cargo" allowClear>
                                                {
                                                    dataCargos.map((data) => (
                                                        <Option key={data.nombreCargo} value={data.cargoId}>
                                                            {data.nombreCargo}
                                                        </Option>
                                                    ))}
                                            </Select>
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

                </Form>
            </Modal>
        </>

    )
}

export default ParticipanteEstimacion