import React, { useState } from 'react'
import { Typography, Form, List, Divider, Input, DatePicker, Select, Button, Card, Drawer, Spin } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
import TableClient from '../client/TableClient';
import useClient from "../../hooks/useClient";
import DescriptionsItem from '../admin-personnel/DescriptionsItem';
const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;
export default function FormProjects() {

    const [form] = Form.useForm();

    const { dataClient, loading } = useClient();

    //para controlar el drawer de cliente
    const [openTableClient, setOpenTableClient] = useState(false);

    const [clienteAtProject, setClientAtProject] = useState();

    //Para cerrar el drawer de cliente
    const onClose = () => {
        setOpenTableClient(false);
    };

   
    console.log("data", clienteAtProject)
    return (
       <Spin spinning={false}>
         <div className='container mx-auto p-10'>
            <Title>Registrar proyecto</Title>
            <Form
                className="grid gap-2 grid-rows-2 grid-cols-1"
                autoComplete="off"
                form={form}

            >
                <Form.Item
                    name="nombreproyecto"
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

                {/* <Form.Item label="Fecha de proyecto">
                    <RangePicker />
                </Form.Item> */}
                {/* 
                <Form.Item
                    name="Estado"
                    label="Estado"
                    hasFeedback
                >
                    <Select placeholder="Seleccione estado del proyecto">
                        <Option value={1}>Activo</Option>
                        <Option value={2}>....</Option>
                        <Option value={3}>...</Option>
                    </Select>
                </Form.Item> */}
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

            <Button type="primary" htmlType="submit">
                Guadar proyecto
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
