import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Space, Select, message, Spin, Card, Row } from 'antd';
import { BulbOutlined, RightOutlined } from "@ant-design/icons"
import { tipoComponente } from './itemSelect'
import useAuth from '../../hooks/useAuth';
import CallApi from '../../ServicesHttp/CallApi';
import useEstimate from "../../hooks/useEstimate"


const { Option } = Select;
function Step1Form({ idProyecto }) {

    const [form] = Form.useForm();
    const { auth } = useAuth();

    const { setStep, saveClassificationComponents, setSaveClassificationComponents } = useEstimate();

    //Para saber cuando se estan obteniendo los datos
    const [loading, setLoanding] = useState(false);

    // const [progress, setProgress] = useState(0);

    //Para guardar los requerimientos de software
    const [requerimentClient, setRequerimentClient] = useState(null)

    /**
     *Function para obtener los datos los requerimientos
    */
    const fetchRequerimentsForEstimate = async () => {
        setLoanding(true);
        await CallApi.get(`RequerimientosClientes/SWRequerimentsForEstimate/${idProyecto}`).then((res) => {
            setLoanding(false);
            setRequerimentClient(res.data)
            console.log("aa", res.data)
        }).catch((error) => {
            setLoanding(false);
            message.error("Error Interno", error.message);
        });

    };


    const classifierIA = async () => {
        setLoanding(true)
        const newValues = requerimentClient.flatMap(({ requisitoSf }) => requisitoSf.map(({ id, requerimientoSf }) => ({ id, requerimientoSf })));
        await CallApi.post("http://localhost:8080/classifiction-requeriments-SW", newValues).then((res) => {
            //console.log("res", JSON.parse(res.data.body))
            // Agregar propiedades del segundo objeto al primer objeto
            const updatedRequerimentClient = requerimentClient.map(requeriment => {
                const updatedRequisitoSf = requeriment.requisitoSf.map(sf => {
                    const { id, clasificacion, complejidad, tipoComponenteId
                    } = JSON.parse(res.data.body).find(item => item.id === sf.id);
                    return {
                        id, requerimientoSf: sf.requerimientoSf, clasificacion, complejidad, tipoComponenteId, proyectoId: idProyecto, usuarioId: auth.idUsuario
                    };
                });
                return { ...requeriment, requisitoSf: updatedRequisitoSf };
            });
            setRequerimentClient(updatedRequerimentClient);
            form.setFieldsValue({ names: updatedRequerimentClient });

            setLoanding(false);

        }).catch((error) => {
            message.error(error.message);
            setLoanding(false)
        });

    }

    useEffect(() => {
        fetchRequerimentsForEstimate();
    }, []);


    //funcion para contar la duracion de la peticcion
    // useEffect(() => {
    //     let intervalId = null;
    //     if (loading) {
    //         intervalId = setInterval(() => {
    //             setProgress((prevProgress) => {
    //                 if (prevProgress === 100) {
    //                     clearInterval(intervalId);
    //                     return 0;
    //                 }
    //                 return prevProgress + 10;
    //             });
    //         }, 1000);
    //     } else {
    //         setProgress(0);
    //     }
    //     return () => clearInterval(intervalId);
    // }, []);


    // onUploadProgress: progressEvent => {
    //     const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    //     setProgress(percentCompleted);
    //   },


    const onFinish = () => {
        form.validateFields().then(async (values) => {
            setSaveClassificationComponents(values.names);
            setStep((prev) => prev + 1);
        })
    };

    return (
        <Spin size='large' spinning={loading}>

            {requerimentClient !== null && (<Form
                form={form}
                name="dynamic_form_Componente_funcionales"
                initialValues={{ names: saveClassificationComponents ?? requerimentClient }}


                // onFinish={onFinish}
                autoComplete="off"
            >
                <Form.List name="names">
                    {(fields) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Card className='mt-5 max-w-full rounded overflow-hidden shadow-sm'>
                                    <div key={key}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'requisito']}
                                            label={`${key}. Requerimiento de cliente`}
                                            key={[key, 'requisito']}
                                        >
                                            <Input status="warning" readOnly />
                                        </Form.Item>
                                        <Form.List name={[name, 'requisitoSf']} >
                                            {(fields) => (
                                                <>
                                                    {fields.map(({ key, name, ...restField }) => (
                                                        <Space
                                                            key={key}
                                                            align='baseline'
                                                            className='ml-5 grid grid-cols-3'

                                                        >

                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'requerimientoSf']}
                                                                label="Requisito de software"
                                                                key={[key, 'requerimientoSf']}

                                                            >
                                                                <Input.TextArea readOnly
                                                                    autoSize={{ minRows: 3, maxRows: 6 }}
                                                                />
                                                            </Form.Item>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'tipoComponenteId']}
                                                                label="Componente"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: "El tipo componente es requerido"
                                                                    },
                                                                ]}

                                                            >
                                                                <Select>
                                                                    {tipoComponente.map((data) => (
                                                                        <Option key={data.TipoComponente_Id} value={data.TipoComponente_Id} disabled>
                                                                            {data.NombreComponente}
                                                                        </Option>
                                                                    ))}
                                                                </Select>

                                                            </Form.Item>

                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'complejidad']}
                                                                label="Complejidad"
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message: "La complejidad es requerida",
                                                                    },
                                                                ]}
                                                            >
                                                                {/* <Select>
                                                                    {Complejidad.map((data) => (
                                                                        <Option key={data.Complejidad} value={data.Complejidad} disabled>
                                                                            {data.Complejidad}
                                                                        </Option>
                                                                    ))}
                                                                </Select> */}
                                                                <Input readOnly />
                                                            </Form.Item>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'usuarioId']}
                                                                key={[key, 'id']}
                                                                hidden={true}
                                                                initialValue={auth.idUsuario}
                                                            >
                                                                <Input />
                                                            </Form.Item>
                                                            <Form.Item
                                                                {...restField}
                                                                name={[name, 'proyectoId']}
                                                                key={[key, 'id']}
                                                                hidden={true}
                                                                initialValue={idProyecto}
                                                            >
                                                                <Input />
                                                            </Form.Item>

                                                        </Space>
                                                    ))}

                                                </>
                                            )}
                                        </Form.List>

                                    </div>
                                </Card>

                            ))}
                        </>
                    )}
                </Form.List>

            </Form>)}

            <hr className="divide-y divide-dashed" />
            <Row className='flex gap-3 '>
                <Button className="bg-black border-none shadow-sm hover:bg-slate-700 text-white font-sans py-1.5 px-2.5  rounded inline-flex items-center" onClick={() => classifierIA()}>
                    <BulbOutlined /> Clasificar Componentes
                </Button >
                <Button type="primary" htmlType="submit" onClick={() => onFinish()}>
                    Siguiente <RightOutlined />
                </Button>
            </Row>


        </Spin>


    )
}

export default Step1Form;