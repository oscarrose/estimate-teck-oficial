import React, { useState } from "react";
import { Modal, Form, Input, Select, Spin, Button, message } from "antd";
import CallApi from "../../ServicesHttp/CallApi";
import { tipoClient } from "./ItemSelectClient";
import { Countrys, ProvinciaRD } from "../admin-personnel/ItemsSelect";

const { Option } = Select;

function ModalFormEmployee({
  setDataClient,
  setControlFormClient,
  controlFormClient,
  setUpdateTableClient
}) {
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };


  //Asginar los valores a editar
  /* const edit = () => {
     form.setFieldsValue({
      nombre: controlFormClient.dataEdit.nombre,
      apellido: controlFormClient.dataEdit.apellido,
      identificacion: controlFormClient.dataEdit.identificacion,
      celular: controlFormClient.dataEdit.celular,
      email: controlFormClient.dataEdit.email,
      telefonoResidencial: controlFormClient.dataEdit.telefonoResidencial,
     
      ciudad: controlFormClient.dataEdit.ciudad,
      calle: controlFormClient.dataEdit.calle,
      sector: controlFormClient.dataEdit.sector,
     
    });
  };*/

  const [loandingSave, setLoandingSave] = useState(false);

  //Para las peticciones de crear y actualizar
  const onSubmit = async (values) => {
    setLoandingSave(true);
    if (!controlFormClient.dataEdit) {
     
      await CallApi.post("Client/CreateClient", values)
        .then((res) => {
          message.success("Registrado correctamente");
          onReset();
          setDataClient((prevData) => prevData.concat(res.data));
          setLoandingSave(false);
        })
        .catch((error) => {
          setLoandingSave(false);
          message.error("Error interno", error.message);
        });
    } else {

      const newValues = {
        ...values,
        fechaCreacion: controlFormClient.dataEdit.fechaCreacion,
        clienteId: controlFormClient.dataEdit.clienteId,
      };

      await CallApi.put(
        `Client/PutClient/${controlFormClient.dataEdit.clienteId}`,
        newValues
      )
        .then(() => {
          setUpdateTableClient((prevData) => !prevData)
          message.success("Datos del cliente actualizados");
          setLoandingSave(false);
          setControlFormClient({
            ...controlFormClient,
            visible: false,
          });

        })
        .catch((error) => {
          setLoandingSave(false);
          message.error("Error interno", error.message);
        });
    }
  };

  return (
    <div>
      <Modal
        width={800}
        centered
        open={controlFormClient.visible}
        onCancel={() => {
          // onReset();
          setControlFormClient({
            ...controlFormClient,
            visible: false,
            dataEdit: null,
          });
        }}
        footer={null}
      >
        {controlFormClient.dataEdit ? (
          <p className=" text-2xl text-center mb-6">
            Actualizar datos del cliente
          </p>
        ) : (
          <p className=" text-2xl text-center mb-6">Crear nuevo cliente</p>
        )}

        <Spin spinning={loandingSave}>
          <Form
            className="grid gap-2 grid-rows-6 grid-cols-2"
            onFinish={onSubmit}
            autoComplete="on"
            form={form}
            initialValues={controlFormClient.dataEdit}
          //setfieldsvalue={controlFormClient.dataEdit !== null ? edit() : onReset()}
          >

            <Form.Item
              name="nombreCliente"
              label="Nombre de cliente"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "El nombre del cliente es requerido",
                },
              ]}
            >
              <Input placeholder="Nombre del cliente" />
            </Form.Item>


            {
              <Form.Item
                name="tipoId"
                label="Tipo cliente"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "El tipo es requerido",
                  },
                ]}
              >
                <Select placeholder=" Seleccione el tipo de cliente" allowClear>
                  {tipoClient.map((data) => (
                    <Option key={data.tipoId} value={data.tipoId}>
                      {data.nombreTipo}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            }

            <Form.Item
              name="tipoIdentificacion"
              label="Tipo de identificación"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "El tipo de identifiación es requerido",
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Seleccione tipo de identificación"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                <Option value="RNC">RNC</Option>
                <Select.Option value="CEDULA">Cédula</Select.Option>
                <Option value="PASAPORTE">Pasaporte</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="identificacion"
              label="Identificación"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "La identificación es requerida",
                },
                {
                  max: 13,
                  message: "Identificacación límite superado",
                },
              ]}
            >
              <Input placeholder="RCN/Cédula/Pasaporte" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              hasFeedback
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "El email es requerido",
                },
              ]}
            >
              <Input type="email" placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="telefonoResidencial"
              label="Teléfono residencial"
              rules={[{
                max: 10,
                min: 10,
                message: "El numero de telefono es invalido"
              }]}
              hasFeedback
            >
              <Input type="number" placeholder="(###)#######" />
            </Form.Item>
            <Form.Item
              name="celular"
              label="Celular"
              hasFeedback
              rules={[
                {
                  require: true,
                  message: "El celular es requerido",

                },
                {
                  max: 10,
                  min: 10,
                  message: "El numero de celular es invalido"
                }
              ]}
            >
              <Input type="number" placeholder="(###)#######" />
            </Form.Item>
            <Form.Item
              name="pais"
              label="Pais"
              rules={[
                {
                  required: true,
                  message: "El pais es necesario!",
                },
              ]}
              hasFeedback
            >
              <Select
                placeholder="Seleccione el país"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {Countrys.map((option) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="estado" label="Provincia"
              rules={[
                {
                  required: true,
                  message: "La provincia es necesaria!",
                },
              ]}
              hasFeedback>
              <Select
                placeholder="Provincia donde esta establecido"
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {ProvinciaRD.map((option) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="direccion"
              label="Dirección"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "El campo es requerido",
                },
              ]}
            >
              <Input placeholder="Ciudad, nombre de la calle, No. casa" />
            </Form.Item>



            {!controlFormClient.dataEdit && (
              <Button type="primary" htmlType="reset" danger>
                Cancelar
              </Button>
            )}

            <Button type="primary" htmlType="submit">
              Guardar
            </Button>
          </Form>


        </Spin>
      </Modal>
    </div>
  );
}

export default ModalFormEmployee;
