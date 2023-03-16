import React, { useState } from "react";
import { Modal, Form, Select, Spin, Button, message } from "antd";
import CallApi from "../../../ServicesHttp/CallApi";
import DescriptionsItem from "../DescriptionsItem";
import { DefaultPassword } from "../ItemsSelect";
const { Option } = Select;

function ModalFormUser({ dataEmployeeWithoutUser, dataRol, controlFormUser, setControlFormUser, setDataUser, setloanding, userResetPassowrd, setUserResetPassword }) {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const [loandingSave, setLoandingSave] = useState(false);

  const [EmployeeSelect, setEmployeeSelect] = useState("")

  //Para ejecutar las petticiones de crear y restablecer contraseña
  const onSubmit = async (values) => {
    setloanding(true);
    if (!userResetPassowrd) {
      //Para las peticciones de crear usuario
      console.log("saved", values)
      await CallApi.post("Auth/RegisterUser", values)
        .then((res) => {
          setLoandingSave(false);
          setEmployeeSelect("");
          message.success("Registrado correctamente");
          setDataUser((prevData) => prevData.concat(res.data));
          onReset();
        })
        .catch((error) => {
          setLoandingSave(false);
          message.error(error.response.data);
        });


    } else {
      console.log("rest",userResetPassowrd.usuarioId)
      //Para restablecer la contraseña
      CallApi.patch(`Usuarios/resetPasswordUser/${userResetPassowrd.usuarioId}`, values
      ).then(() => {
        message.success("Contraseña restablecida")
        setloanding(false);
        setControlFormUser(false);
      }).catch((error) => {
        setloanding(false);
        message.error(error.message);
      });
    }


  };



  const handleCurrentEmoloyee = (value) => {
    const currentEmployee = dataEmployeeWithoutUser.find(element => element.empleadoId === value)
    setEmployeeSelect(currentEmployee)

  };


  return (
    <div>
      <Modal

        width={800}
        centered
        open={controlFormUser}
        onCancel={() => {
          setControlFormUser(false);
          setEmployeeSelect("");
          setUserResetPassword(null);
          onReset();
        }}
        footer={null}
      >


        {userResetPassowrd ? (
          <p className=" text-2xl text-center mb-6">
            Restablecer constraseña
          </p>
        ) : (
          <p className=" text-2xl text-center mb-6">Crear nuevo usuario</p>
        )}

        <Spin spinning={loandingSave}>
          <Form
            className="grid gap-2 grid-rows-5 grid-cols-2"
            onFinish={onSubmit}
            autoComplete="off"
            form={form}
          //setfieldsvalue={editEmployee !== null ? edit() : onReset()}
          >

            {!userResetPassowrd && (
              <>
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
                    onChange={handleCurrentEmoloyee}
                  >
                    {dataEmployeeWithoutUser.map((data) => <Option key={data.empleadoId}
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
              </>
            )}


            <Form.Item
              name="password"
              label="Contraseña por defecto"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "La contraseña por defecto es requerida",
                },
              ]}
            >
              <Select
                placeholder=" Seleccione contraseña por defecto"
                allowClear
              >
                {DefaultPassword.map((data) => <Option key={data.idPassword}
                  value={data.password}>{data.label}</Option>)}

              </Select>

            </Form.Item>
            <br />
            {userResetPassowrd ? (
              <>
                <DescriptionsItem title="Empleado" content={userResetPassowrd.empleado} />
                <DescriptionsItem title="Estado" content={userResetPassowrd.estadoUsuario} />
                <DescriptionsItem title="Rol" content={userResetPassowrd.rol} />
                <DescriptionsItem title="Email" content={userResetPassowrd.emailUsuario} />
              </>

            ) : (
              <>
                <DescriptionsItem title="Id empleado" content={EmployeeSelect.empleadoId ?? "N/A"} />
                <DescriptionsItem title="Cargo" content={EmployeeSelect.cargo ?? "N/A"} />
                <DescriptionsItem title="Identificación" content={EmployeeSelect.identificacion
                  ?? "N/A"} />
                <DescriptionsItem title="Email" content={EmployeeSelect.email ?? "N/A"} />
              </>
            )}

            <Button type="primary" htmlType="reset" danger>
              Cancelar
            </Button>

            <Button type="primary" htmlType="submit">
              {userResetPassowrd ? ("Aceptar") : ("Crear usuario")}
            </Button>

          </Form>



        </Spin>
      </Modal>
    </div>
  );
}

export default ModalFormUser;
