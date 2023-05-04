import React from 'react'
import { Form, Modal, Input, Select, message } from 'antd';
import useEstimate from '../../hooks/useEstimate';
import CallApi from '../../ServicesHttp/CallApi';
import { PisITBIS } from "./itemSelect"
const { Option } = Select;
function FormParametroEconomico({ detalleEstimacion }) {

    const { isModalParametro, setIsModalParametro, setUpdateDetalleEstimacion, setLoandingEstimacion } = useEstimate();

    
    const [form] = Form.useForm();
    const estimacionId = detalleEstimacion.viewEstimacion.estimacionId;
    const costoBrutoEstimado = detalleEstimacion.viewEstimacionDetalle.costoBrutoEstimado;
    const onReset = () => {
        form.resetFields();
    };


    const addParticipanteEstimacion = async (values) => {
        setLoandingEstimacion(true)

        const newValues = {
            ...values,
            costoBrutoEstimado: costoBrutoEstimado
        }
       

        await CallApi.post("Estimacions/CalcularCostoTotal", newValues)
            .then(() => {
                setUpdateDetalleEstimacion((prevData) => !prevData);
                handleCancel();
                message.success("Costo total estimado correctamente");
            })
            .catch((error) => {
                message.error(error.message);
                setLoandingEstimacion(false)
            });
    }


    const handleOk = () => {
        form.validateFields().then(async (values) => {
           
            addParticipanteEstimacion(values)

        })

    };
    const handleCancel = () => {
        setIsModalParametro(false);
        onReset();
    };


    return (
        <>
            <Modal title="Aplicar parametros económicos" open={isModalParametro} onOk={handleOk} onCancel={handleCancel}>

                <Form
                   // name="parametros_economicos"
                    // onFinish={onFinish}
                    form={form}
                    autoComplete="off"
                >
                    <Form.Item
                        name="itbis"
                        label="Impuesto ITBIS"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Es requerido",
                            },
                        ]}
                    >
                        <Select placeholder="Seleccione el país"

                        >
                            {PisITBIS.map((data) => (
                                <Option key={data.id} value={data.valor}>
                                    {data.pais}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="costoSoporte"
                        label="Soporte"
                        rules={[
                            {
                                required: true,
                                message: "Es requerido",
                            },
                        ]}
                        hasFeedback
                    >
                        <Select placeholder="Seleccione el año de soporte">
                            <Option value="0.22">1 año de soporte</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="costoImplementacion"
                        label="Costo implementación"
                        rules={[
                            {
                                required: true,
                                message: "Es requerido",
                            },
                        ]}
                        hasFeedback
                    >
                        <Select placeholder="Seleccione el plan de implementación">
                            <Option value="0.15">Estandar</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="estimacionId"
                        hidden={true}
                        initialValue={estimacionId}

                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>

    )
}

export default FormParametroEconomico