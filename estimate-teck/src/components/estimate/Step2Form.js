import React, { useState } from 'react'
import { Button, Form, Input, Space, Select, Spin } from 'antd';
import { CharacteristicSystem, ScoreForAdjustmentFactor } from './itemSelect'

const { Option } = Select;
function Step2From({ idProyecto, setStep, systeCharacteristc, setSystemCharacteristic }) {


  //Para saber cuando se estan obteniendo los datos
  const [loading, setLoanding] = useState(false);

  const initialValue = CharacteristicSystem.map((item) => ({
    Caracteristica: item.characteristic,
    Puntaje: "",
    ProyectoId: idProyecto
  }))

  const onFinish = (values) => {
    console.log('values:', values);
    setSystemCharacteristic(values['names'])
    setStep((prev) => prev + 1)
  };

  return (
    <Spin spinning={loading}>


      <Form

        name="dynamic_form_caracteristica_sistema"
        initialValues={{ names: systeCharacteristc ?? initialValue }}
        onFinish={onFinish}

        autoComplete="off"
      >
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
                  {/* <Form.Item
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

                  </Form.Item> */}

                  <Form.Item

                    {...restField}
                    name={[name, "Caracteristica"]}
                    label={`${key}. Caracteristica del sistema`}
                    hasFeedback validateStatus="success"
                    rules={[
                      {
                        required: true,
                        message: 'La caracteristica es requerida',
                      },
                    ]}
                  >
                    <Input disabled={true} />
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    name={[name, 'Puntaje']}
                    label="Puntaje"
                    rules={[
                      {
                        required: true,
                        message: 'El puntaje es requerida'
                      }
                    ]}
                  >
                    <Select>
                      {ScoreForAdjustmentFactor.map((data) => (
                        <Option key={data.valor} value={data.valor}>
                          {data.significado}
                        </Option>
                      ))}
                    </Select>

                  </Form.Item>

                </Space>
              ))}

            </>
          )}
        </Form.List>
        <Form.Item>
          <Button style={{ marginRight: "75rem" }}
            type="primary" htmlType="submit">
            Siguiente
          </Button>
        </Form.Item>
      </Form>
    </Spin>
  )
}

export default Step2From