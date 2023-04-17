import React, { useState } from 'react';
import { Form, Input, Button, Space, Typography, Select, Card, Spin } from 'antd';
import { MinusCircleOutlined, PlusOutlined, DeleteOutlined, SaveOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { tipoRequerimeinto } from './ItemsSelect';
import useEstimate from '../../hooks/useEstimate';
import { useParams } from 'react-router-dom';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const FormRequisiteIA = () => {

  const [form] = Form.useForm();
  const { idProyecto } = useParams();

  const initialValues = {
    requisitos: [
      {

        id: 1,
        tipoRequerimientoId: 1,
        requisito: 'El sistema permitirá depositar dinero desde un cajero automático',
        requisitoSf: [
          {
            id: 0,
            requerimientoSf: 'El sistema debe permitir al usuario ingresar una cantidad de dinero a depositar',
          },
          {
            id: 1,
            requerimientoSf: 'El sistema debe permitir al usuario ingresar una tarjeta de débito o crédito válida',
          },
        ],
      },
      {
        id: 1,
        tipoRequerimientoId: 1,
        requisito: 'El sistema permitirá depositar dinero desde un cajero automático',
        requisitoSf: [
          {
            id: 0,
            requerimientoSf: 'El sistema debe permitir al usuario ingresar una cantidad de dinero a depositar',
          },
          {
            id: 1,
            requerimientoSf: 'El sistema debe permitir al usuario ingresar una tarjeta de débito o crédito válida',
          },
        ],
      },
    ],
  };

  const { dataIaRequirement } = useEstimate();

  console.log("data", dataIaRequirement)

  const onFinish = (values) => {
    console.log(values);

  };

  return (
    <div className="bg-white shadow-sm px-8 pt-6 pb-8 mb-4 w-full max-w-7xl">
      <Title le level={3}>Creador de requerimientos de software</Title>
      <Spin spinning={false}>
        <Form form={form} initialValues={dataIaRequirement} onFinish={onFinish}>
          <Form.List name="requisitos">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Card className='mt-5 max-w-full rounded overflow-hidden shadow-lg'>
                    <div key={key}>
                      <Form.Item
                        {...restField}
                        name={[name, 'id']}
                        key={[key, 'requisito']}
                        hidden={true}
                      >
                        <Input />
                      </Form.Item>
                      <Space>
                        <Form.Item
                          {...restField}
                          name={[name, 'tipoRequerimientoId']}
                          label="Tipo requerimiento"
                          key={[key, 'tipoRequerimientoId']}

                        >
                          <Select>
                            {tipoRequerimeinto.map((data) => (
                              <Option key={data.tipoRequerimiento_Id} value={data.tipoRequerimiento_Id}>
                                {data.nombre}
                              </Option>
                            ))}
                          </Select>

                        </Form.Item>
                      </Space>
                      <Form.Item
                        {...restField}
                        name={[name, 'requisito']}
                        label="Requerimiento"
                        key={[key, 'requisito']}
                        rules={[{ required: true, message: 'Por favor ingrese un requisito' }]}
                      >
                        <Input placeholder="Requisito" />
                      </Form.Item>
                      <Form.List name={[name, 'requisitoSf']}>
                        {(fields, { add, remove }) => (
                          <div>
                            {fields.map(({ key, name, field, ...restField }) => (
                              <Space
                                key={key}
                                align='baseline'
                                className='grid grid-cols-2'
                              >
                                <Form.Item

                                  {...restField}
                                  name={[name, 'requerimientoSf']}
                                  key={[key, 'requerimientoSf']}
                                  label="Requerimiento de software"
                                  rules={[{ required: true, message: 'Por favor ingrese un requerimiento' }]}
                                >
                                  <TextArea placeholder="Requerimiento"
                                    autoSize={{ minRows: 3, maxRows: 6 }} />
                                </Form.Item>
                                <Button
                                  type="link" onClick={() => remove(name)}>
                                  <MinusCircleOutlined className="dynamic-delete-button" />
                                </Button>
                              </Space>

                            ))}
                            <Form.Item>
                              <Button type="primary" ghost onClick={() => add()} block>
                                <PlusCircleOutlined /> Agregar requisito de software
                              </Button>
                            </Form.Item>
                          </div>
                        )}
                      </Form.List>
                      <Button type="default" danger onClick={() => remove(name)}>
                        <DeleteOutlined />Eliminar requerimiento
                      </Button>
                    </div>
                  </Card>
                ))}
                <hr className="divide-y divide-dashed" />
                <Space
                  className='flex justify-end'
                >
                  <Form.Item

                  >
                    <Button className="bg-black border-none shadow-sm hover:bg-slate-700 text-white font-sans py-1.5 px-2.5  rounded inline-flex items-center" type="dashed" onClick={() => add()} block>
                      <PlusOutlined />Agregar requerimiento
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      <SaveOutlined /> Guardar requerimientos
                    </Button>
                  </Form.Item>
                </Space>
              </>
            )}
          </Form.List>

        </Form>
      </Spin>

    </div>
  );
};

export default FormRequisiteIA;
