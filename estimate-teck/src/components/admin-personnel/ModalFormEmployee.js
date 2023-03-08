import React, { useState } from "react";
import { Modal, Form, Input, Select, Spin, Button, message } from "antd";
import CallApi from "../../ServicesHttp/CallApi";
import { cargo, estadoUsuarioEmpleado } from "./ItemsSelect";
const { Option } = Select;

function ModalFormEmployee({
  setUpdateTableEmployee,
  modalFormEmployee,
  setModalFormEmployee,
  setDataEmployee,
  editEmployee,
  setEditEmployee,
}) {
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };

  //Asginar los valores a editar
  const edit = () => {
    form.setFieldsValue({
      nombre: editEmployee.nombre,
      apellido: editEmployee.apellido,
      identificacion: editEmployee.identificacion,
      celular: editEmployee.celular,
      email: editEmployee.email,
      telefonoResidencial: editEmployee.telefonoResidencial,
      cargoId: editEmployee.cargoId,
      ciudad: editEmployee.ciudad,
      calle: editEmployee.calle,
      sector: editEmployee.sector,
      estadoId: editEmployee.estadoId,
    });
  };

  const [loandingSave, setLoandingSave] = useState(false);

  //Para las peticciones de crear y actualizar
  const onSubmit = async (values) => {
    if (!editEmployee) {
     
      await CallApi.post("Empleados/CreateEmployee", values)
        .then((res) => {
          setLoandingSave(false);
          message.success("Registrado correctamente");
          setDataEmployee((prevData) => prevData.concat(res.data));
          onReset();
        })
        .catch((error) => {
          message.error(error.response.data);
          
          setLoandingSave(false);
        });
    } else {
      const newValues = {
        ...edit(),
        ...values,
        fechaCreacion: editEmployee.fechaCreacion,
        empleadoId: editEmployee.empleadoId,
      };
      await CallApi.put(
        `Empleados/UpdateEmployee/${editEmployee.empleadoId}`,
        newValues
      )
        .then(() => {
          message.success("Datos del empleado actualizados")
          setUpdateTableEmployee((prevData) => !prevData);
          setLoandingSave(false);
          setModalFormEmployee(false);
        })
        .catch((error) => {
          setLoandingSave(false);
          message.error("Error interno", error.response.data);
        });
    }
  };

  return (
    <div>
      <Modal
        width={800}
        centered
        open={modalFormEmployee}
        onCancel={() => {
          setModalFormEmployee(false);
          setEditEmployee(null);
        }}
        footer={null}
      >
        {editEmployee ? (
          <p className=" text-2xl text-center mb-6">
            Actualizar datos del empleado
          </p>
        ) : (
          <p className=" text-2xl text-center mb-6">Crear nuevo empleado</p>
        )}

        <Spin spinning={loandingSave}>
          <Form
            className="grid gap-2 grid-rows-6 grid-cols-2"
            onFinish={onSubmit}
            autoComplete="on"
            form={form}
            setfieldsvalue={editEmployee !== null ? edit() : onReset()}
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
                  message: "Numero de cédula es muy largo",
                },
              ]}
            >
              <Input placeholder="No.cédula" />
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
              name="cargoId"
              label="Cargo"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "El cargo es requerido",
                },
              ]}
            >
              <Select placeholder=" Seleccione el tipo de cargo" allowClear>
                {cargo.map((data) => (
                  <Option key={data.idCargo} value={data.idCargo}>
                    {data.nombre}
                  </Option>
                ))}
              </Select>
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

            {editEmployee && (
              <Form.Item
                name="estadoId"
                label="Estado"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "El estado es requerido",
                  },
                ]}
              >
                <Select placeholder=" Seleccione el tipo de estado" allowClear>
                  {estadoUsuarioEmpleado.map((data) => (
                    <Option key={data.idEstado} value={data.idEstado}>
                      {data.estado}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}

            {!editEmployee && (
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
