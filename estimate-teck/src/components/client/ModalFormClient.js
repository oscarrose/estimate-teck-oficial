import React, { useState } from "react";
import { Modal, Form, Input, Select, Spin, Button, message } from "antd";
import CallApi from "../../ServicesHttp/CallApi";
import { tipoClient } from "./ItemSelectClient";

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
          setUpdateTableClient((prevData)=>!prevData)
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
              name="nombre"
              label="Nombre"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "El nombre es requerido",
                },
              ]}
            >
              <Input placeholder="Nombre" />
            </Form.Item>

            <Form.Item
              name="apellido"
              label="Apellido"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "El apellido es requerido",
                },
              ]}
            >
              <Input placeholder="Apellido" />
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
              name="identificacion"
              label="Identificación"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "El identificación es requerido",
                },
                {
                  max: 13,
                  message: "Identificacación límite superado",
                },
              ]}
            >
              <Input placeholder="Identificacación" />
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
              hasFeedback
            >
              <Input type="number" />
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
              ]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              name="ciudad"
              label="Ciudad"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "El nombre de la ciudad es requerido",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="calle"
              label="Calle"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "El nombre de la calle es requerido",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="sector"
              label="Sector"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "El nombre del sector es requerido",
                },
              ]}
            >
              <Input />
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
