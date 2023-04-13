import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Space, Select, message, Spin } from 'antd';
import { tipoComponente, Complejidad } from './itemSelect'
import CallApi from '../../ServicesHttp/CallApi';

const { Option } = Select;
function Step1Form({ idProyecto, setStep,componentSystem,setComponentSystem }) {

    const [form] = Form.useForm();

    //Para saber cuando se estan obteniendo los datos
    const [loading, setLoanding] = useState(false);

    const [requerimentClient, setRequerimentClient] = useState([])



    /**
     *Function para obtener los datos los requerimientos
    */
    const fetchRequeriment = async () => {
        setLoanding(true);
        await CallApi.get(`RequerimientosClientes/RequerimientdByEstimate/${idProyecto}`)
            .then((res) => {
                setLoanding(false);
                setRequerimentClient(res.data)
            })
            .catch((error) => {
                setLoanding(false);
                message.error("Error Interno", error.message);
            });

    };

    useEffect(() => {
        fetchRequeriment();
    }, []);

    let initialValue = requerimentClient.map((item) => ({
        RequerimientoId: item.requerimientoId,
        descripcion: item.descripcion,
        TipoComponenteId: "",
        Complejidad: "",
        ProyectoId: ""
    }));

    const onFinish = (values) => {
        setComponentSystem(values['names'])
       // initialValue = { ...initialValue, ...componentSystem['names'] }
        console.log('Received:', values);
        
        setStep((prev) => prev + 1);
    };
    
    return (
        <Spin spinning={loading}>
            {initialValue.length > 0 && (

                <Form
                    form={form}
                    name="dynamic_form_Componente_funcionales"
                    initialValues={{ names: componentSystem ?? initialValue }}
                    onFinish={onFinish}

                    autoComplete="off"
                >
                    {console.log("Va",componentSystem )}
                    <Form.List
                        name="names"

                    >
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
                                            name={[name, "RequerimientoId"]}
                                            hidden={true}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'El requerimiento es requerido'
                                                },
                                            ]}
                                        >
                                            <Input />

                                        </Form.Item>

                                        <Form.Item

                                            {...restField}
                                            name={[name, "descripcion"]}
                                            label="Requisito"
                                            hasFeedback validateStatus="success"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'El requerimiento es requerido',
                                                },
                                            ]}
                                        >
                                            <Input disabled={true} />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'TipoComponenteId']}
                                            label="Clasificación de componente"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'El tipo de componente es requrido',
                                                },
                                            ]}
                                        >
                                            <Select>
                                                {tipoComponente.map((data) => (
                                                    <Option key={data.TipoComponente_Id} value={data.TipoComponente_Id}>
                                                        {data.NombreComponente}
                                                    </Option>
                                                ))}
                                            </Select>

                                        </Form.Item>

                                        <Form.Item
                                            {...restField}
                                            name={[name, 'Complejidad']}
                                            label="Complejidad"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'La complejidad es requerida',
                                                },
                                            ]}
                                        >
                                            <Select>
                                                {Complejidad.map((data) => (
                                                    <Option key={data.Complejidad} value={data.Complejidad}>
                                                        {data.Complejidad}
                                                    </Option>
                                                ))}
                                            </Select>

                                        </Form.Item>

                                    </Space>
                                ))}

                            </>
                        )}
                    </Form.List>
                    <Form.Item >
                        <Button style={{ marginRight: "75rem" }} type="primary" htmlType="submit">
                            Siguiente
                        </Button>
                    </Form.Item>
                </Form>)}
        </Spin>

    )
}

export default Step1Form