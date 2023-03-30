import React from 'react'
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Divider, Button, notification, Select, Input, Col, Row } from "antd";
import useAuth from '../../hooks/useAuth';

const FormRequirementDynamic = ({ afiliado, setMinor, dependentFormState }) => {
    const { auth } = useAuth();

    return (
        <Form.List name="requirementDynamic"
        // initialValue={[newDataupdate]}
        >
            {(fields, { add, remove }) => {
                return (
                    <div>
                        {fields.map((field, index) => (

                            <div key={field.key} className='ant-advanced-form'>
                                {/* {dependentFormState.dependentUpdate ? "" : <Divider>Nuevo requerimiento</Divider>} */}
                                <Row gutter={{
                                    xs: 8,
                                    sm: 16,
                                    md: 24,
                                    lg: 24
                                }} >
                                    <Form.Item
                                        name={[index, "requerimientoId"]}
                                        initialValue={afiliado}
                                        hidden={true}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Col className='gutter-row' span={8}>
                                        <Form.Item
                                            name={[index, "tipoRequerimiento"]}
                                            label="Tipo requerimiento"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "El tipo de requerimiento es requerido"
                                                }
                                            ]}
                                        >
                                            <Select
                                                options={[
                                                    {
                                                        value: "Funcional",
                                                        label: "Funcional"
                                                    },
                                                    {
                                                        value: "No funcional",
                                                        label: "No funcional"
                                                    },



                                                ]}
                                            />

                                        </Form.Item>
                                    </Col>

                                    <Col className='gutter-row' span={14}>
                                        <Form.Item
                                            name={[index, "descripcion"]}
                                            label="Descripción"
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
                    </div>
                )
            }}

        </Form.List>
    )
}

export default FormRequirementDynamic