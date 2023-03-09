import React, { useState } from "react";
import { Modal, Form, Select, Spin, Button, message } from "antd";
import CallApi from "../../../ServicesHttp/CallApi";
//import CallApi from "../../ServicesHttp/CallApi";

const { Option } = Select;

function ModalFormUser({ dataEmployee, dataRol, controlFormUser, setControlFormUser,setDataUser }) {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };



  const [loandingSave, setLoandingSave] = useState(false);

  //Para las peticciones de crear usuario
  const onSubmit = async (values) => {
      console.log("de", values)
     await CallApi.post("Auth/RegisterUser", values)
        .then((res) => {
          setLoandingSave(false);
          message.success("Registrado correctamente");
          setDataUser((prevData) => prevData.concat(res.data));
          onReset();
        })
        .catch((error) => {
          setLoandingSave(false);
          console.log(error.response.data)
          message.error(error.response.data);
        });
    
  };

  return (
    <div>
      <Modal
        width={800}
        centered
        open={controlFormUser}
        onCancel={() => {
          setControlFormUser(false);
          // setEditEmployee(null);
        }}
        footer={null}
      >

        <p className=" text-2xl text-center mb-6">Crear nuevo usuario</p>
        {/* {editEmployee ? (
          <p className=" text-2xl text-center mb-6">
            Actualizar datos del usuario
          </p>
        ) : (
         
        )} */}

        <Spin spinning={loandingSave}>
          <Form
            className="grid gap-2 grid-rows-2 grid-cols-2"
            onFinish={onSubmit}
            autoComplete="off"
            form={form}
          //setfieldsvalue={editEmployee !== null ? edit() : onReset()}
          >

            <Form.Item
              name="idEmpleado"
              label="Empleado"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "El empleado es requerido"
                },
              ]}
            >
              <Select
                placeholder=" Seleccione el Empleado"
                allowClear
              >
                {dataEmployee.map((data) => <Option key={data.empleadoId}
                 value={data.empleadoId}>{`${data.nombre} ${data.apellido}`}</Option>)}
              </Select>

            </Form.Item>

            <Form.Item
              name="idRol"
              label="Rol"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "El rol es requerido",
                },
              ]}
            >
              <Select
                placeholder=" Seleccione el rol"
                allowClear
              >
                {dataRol.map((data) => <Option key={data.idRol} value={data.idRol}>{`${data.nombre}`}</Option>)}
              </Select>

            </Form.Item>



            <Button type="primary" htmlType="reset" danger>
              Cancelar
            </Button>

            <Button type="primary" htmlType="submit">
              Guardar
            </Button>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
}

export default ModalFormUser;
