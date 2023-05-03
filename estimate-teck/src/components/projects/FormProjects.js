import React, { useState, useEffect } from 'react'
import { Typography, Form, message, Divider, Input, DatePicker, Select, Button, Card, Drawer, Spin } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import TableClient from '../client/TableClient';
import useClient from "../../hooks/useClient";
import DescriptionsItem from '../admin-personnel/DescriptionsItem';
import { useNavigate, useParams } from "react-router-dom";
import { typeProyect,typeApplication } from "./itemsSelect"
import CallApi from '../../ServicesHttp/CallApi';
import useAuth from '../../hooks/useAuth';
const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;


let rute = process.env.REACT_APP_RUTE_VM
export default function FormProjects() {

    let { idProject } = useParams(); //obtener el id desde la url


    const [form] = Form.useForm();

    const navigate = useNavigate();

    const { dataClient, loading } = useClient();
    const { auth } = useAuth();

    const [loadingProject, setLoadingProject] = useState(false);

    //para controlar el drawer de cliente
    const [openTableClient, setOpenTableClient] = useState(false);

    const [clienteAtProject, setClientAtProject] = useState();

    const [dataEdit, setDataEdit] = useState(null); //El proyecto que se va a editar

    //Para cerrar el drawer de cliente
    const onClose = () => {
        setOpenTableClient(false);
    };

    //control de peticciones
    const onSubmit = async (values) => {
        setLoadingProject(true);
        if (idProject) {
            const newValues = {
                ...dataEdit,
                ...values,
                clienteId: clienteAtProject.clienteId
            }
            await CallApi.put(
                `Proyectos/updateProject/${newValues.proyectoId}`,
                newValues
            ).then(() => {
                setDataEdit(null)
                message.success("Datos del projecto actualizado"); setLoadingProject(false);
                navigate(rute + "projects", { replace: true });
            }).catch((error) => {
                setLoadingProject(false);
                message.error("Error interno2", error.message);
            });
        } else {

            const newValues = {
                ...values,
                usuarioId: auth.idUsuario,
                clienteId: clienteAtProject.clienteId,
                estadoProyectoId: 1
            }

            console.log("new", newValues)
            await CallApi.post("Proyectos/RegisterProject", newValues).then(() => {
                setLoadingProject(false);
                navigate(rute + "projects", { replace: true });
                message.success("Registrado correctamente");
            }).catch((error) => {
                console.log(error)
                setLoadingProject(false);
                message.error("Error interno1", error.message);
            });
        }

    }

    //Para obtener la data que se va a editar
    const loadingDataProject = () => {
        setLoadingProject(true);
        CallApi
            .get(`Proyectos/oneProject/${idProject}`)
            .then((res) => {
                setDataEdit(res.data);
                setClientAtProject({
                    ...res.data.cliente,
                    tipo: { nombreTipoCliente: res.data.nombreTipoCliente }
                });
                setLoadingProject(false);
                console.log("de", res.data)
            })
            .catch((error) => {
                setLoadingProject(false);
                message.error(error.message);
            });
    };

    useEffect(() => {
        if (idProject) {
            loadingDataProject();
        }
    }, []);

    //Asginar los valores a editar
    const edit = () => {
        form.setFieldsValue({
            nombreProyecto: dataEdit.nombreProyecto,
            descripcion: dataEdit.descripcion,
            TipoProyecto:dataEdit.tipoProyecto
        });
    };

    return (
        <Spin spinning={loadingProject}>
            <div className='container mx-auto p-10'>
                {idProject ? <Title>Actualizar proyecto</Title> : <Title>Registrar proyecto</Title>}

                <Form
                    form={form}
                    name='formProject'
                   
                    setfieldsvalue={dataEdit !== null && edit()}
                    autoComplete="off"
                    className="grid gap-2 grid-rows-2 grid-cols-1"
                >
                    <Form.Item
                        name="nombreProyecto"
                        label="Nombre del proyecto"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "El nombre del proyecto es requerido",
                            },
                        ]}
                    >
                        <Input placeholder="Nombre del cliente" />
                    </Form.Item>

                   

                    <Form.Item
                        name="TipoProyecto"
                        label="Tipo de proyecto"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "El tipo de proyecto es requerido",
                            },
                        ]}
                    >
                        <Select showSearch placeholder="Seleccione el tipo de proyecto"
                            filterOption={(input, option) =>
                                (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                        >
                            {typeProyect.map((data) => (
                                <Option key={data.id} value={data.TipoProyecto}>
                                    {data.TipoProyecto}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="TipoAplicacion"
                        label="Tipo de aplicación"
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "El tipo de aplicacion es requerido",
                            },
                        ]}
                    >
                        <Select showSearch placeholder="Seleccione el tipo de aplicación"
                            filterOption={(input, option) =>
                                (option?.value ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                        >
                            {typeApplication.map((data) => (
                                <Option key={data} value={data}>
                                    {data}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="descripcion"
                        label="Descripcion"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor ingrese una descripcion del proyecto'
                            },
                        ]}
                    >
                        <Input.TextArea placeholder="Comentarios referente al proyecto" />
                    </Form.Item>
                </Form>
                <Divider></Divider>
                <Card
                    title="Cliente del proyecto"
                    extra={<Button type='primary'
                        icon={<PlusOutlined />}
                        onClick={
                            () => setOpenTableClient(true)
                        }
                    >
                        Agregar
                    </Button>}
                >
                    {clienteAtProject && (
                        <div className='flex gap-48'>
                            <DescriptionsItem title="Id cliente" content={clienteAtProject.clienteId} />
                            <DescriptionsItem title="Cliente" content={clienteAtProject.nombreCliente} />
                            <DescriptionsItem title="Identificacion" content={clienteAtProject.identificacion} />
                            <DescriptionsItem title="Tipo cliente" content={clienteAtProject.tipo.nombreTipoCliente} />
                        </div>
                    )}

                </Card>

                <div className='flex gap-5 mt-6 justify-end'>
                    <Button type="primary" htmlType="reset" danger>
                        Cancelar
                    </Button>

                    <Button type="primary" htmlType="submit"
                        onClick={() => {
                            form.validateFields().then((values => {
                                onSubmit(values);
                            }));
                        }}

                    >
                        {idProject ? "Guardar cambios" : " Guadar proyecto"}
                    </Button>
                </div>

                <Drawer placement='top'
                    size={'large'}
                    title="Seleccionar cliente"
                    onClose={onClose}
                    open={openTableClient}
                >

                    <TableClient
                        setOpenTableClient={setOpenTableClient}
                        setClientAtProject={setClientAtProject}
                        openTableClient={openTableClient}
                        dataClient={dataClient}
                        loading={loading}
                    />
                </Drawer>
            </div>
        </Spin>

    )
}
