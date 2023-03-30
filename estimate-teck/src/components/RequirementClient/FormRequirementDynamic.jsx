import React from 'react'
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Divider, Button, Select, Input, Col, Row } from "antd";
import { tipoRequerimeinto } from './ItemsSelect';

const { Option } = Select;

const FormRequirementDynamic = ({ ProyectoId, editRequirement }) => {

    console.log("cc", editRequirement)

    let newEditRequirement={};

    if(editRequirement){
        newEditRequirement={
            editRequirement
        }
    }
   
    return (
        <Form.List name="RequerimientosClientes"
            initialValue={[editRequirement]}
        >
            {(fields, { add, remove }) => {
                return (
                    <div>
                        {fields.map((field, index) => (

                            <div key={field.key} className='ant-advanced-form'>
                                {editRequirement ? "" : <Divider>Nuevo requerimiento</Divider>}
                                <Row gutter={{
                                    xs: 8,
                                    sm: 16,
                                    md: 24,
                                    lg: 24
                                }} >
                                    <Form.Item
                                        name={[index, "proyectoId"]}
                                        initialValue={ProyectoId}
                                        hidden={true}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Col className='gutter-row' span={8}>
                                        <Form.Item
                                            name={[index, "tipoRequerimientoId"]}
                                            label="Tipo requerimiento"
                                          // initialValue={}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "El tipo de requerimiento es requerido"
                                                }
                                            ]}
                                        >
                                            <Select>
                                                {tipoRequerimeinto.map((data) => (
                                                    <Option key={data.tipoRequerimiento_Id} value={data.tipoRequerimiento_Id}>
                                                        {data.nombre}
                                                    </Option>
                                                ))}
                                            </Select>

                                        </Form.Item>
                                    </Col>

                                    <Col className='gutter-row' span={14}>
                                        <Form.Item
                                            name={[index, "descripcion"]}
                                           
                                            label="Descripción"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "Describir el requerimiento es requerido"
                                                }
                                            ]}
                                        >
                                            <Input.TextArea showCount maxLength={200} />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                {fields.length > 1 ? (
                                    //Para crear el botton de remover
                                    <Button
                                        type="link"
                                        danger
                                        onClick={() => remove(field.name)}
                                        icon={<MinusCircleOutlined />}
                                    >
                                        Remover requerimiento
                                    </Button>
                                ) : null}
                            </div>
                        ))}
                        <Divider />
                        {!editRequirement &&
                            <Form.Item>
                                <Button
                                    //para crear el botton de add form.item
                                    type="default"
                                    onClick={() => add()}
                                    style={{ marginLeft: "46rem" }}
                                >
                                    <PlusOutlined /> Agregar requerimiento
                                </Button>
                            </Form.Item>
                        }
                    </div>
                )
            }}

        </Form.List>
    )
}

export default FormRequirementDynamic