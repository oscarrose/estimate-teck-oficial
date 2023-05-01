import React, { useState } from "react";
import { Modal, Form, Input, Spin, Button, message, Select } from "antd";
import CallApi from "../../ServicesHttp/CallApi";
//import { estadoCargos } from "./ItemSelectCargos";
import useAuth from "../../hooks/useAuth";
//import {cargo} from "../CargosHora/ItemSelectCargos";
import useModuleCargos from "../../hooks/useModuleCargos";
const { Option } = Select;

function ModalFormCargos({
  setDataCargos,
  setControlFormCargos,
  controlFormCargos,
  setUpdateTableCargos
}) {
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };
  const { auth } = useAuth();
  const {dataCargos} = useModuleCargos();

  const [loandingSave, setLoandingSave] = useState(false);

  //Para las peticciones de crear y actualizar
  const onSubmit = async (values) => {

    setLoandingSave(true);
    if (!controlFormCargos.dataEdit) {

      const objNew = {
        ...values,
        usuarioId: auth.idUsuario,
        creadoPor: auth.emailUsuario
      }
      console.log("ho", objNew)

      await CallApi.post("Cargos/CreateCargos", objNew)
        .then((res) => {

          message.success("Registrado correctamente");
          onReset();
          setDataCargos((prevData) => prevData.concat(res.data));
          setLoandingSave(false);
        })
        .catch((error) => {

          setLoandingSave(false);
          message.error("Error interno", error.message);
        });


    } else {

      const newValues = {
        ...values,
        fechaCreacion: controlFormCargos.dataEdit.fechaCreacion,
        cargoId: controlFormCargos.dataEdit.cargoId,
        usuarioId: auth.idUsuario,
        creadoPor: auth.emailUsuario
        //empleadoName:controlFormCargos.dataEdit.empleadoName
      };

      await CallApi.put(
        `Cargos/PutCargos/${controlFormCargos.dataEdit.cargoId}`,
        newValues
      )
        .then(() => {

          setUpdateTableCargos((prevData) => !prevData)

          message.success("Datos de cargos actualizados");

          setLoandingSave(false);
          setControlFormCargos({


            dataEdit: null,
            visible: false,
          });


        })
        .catch((error) => {
          setLoandingSave(false);
          message.error("Error interno", error.response.data);
          console.log("Revisar", error)
        });
    }
  };

  return (
    <div>
      <Modal
        width={800}
        centered
        open={controlFormCargos.visible}
        onCancel={() => {
          // onReset();
          setControlFormCargos({
            ...controlFormCargos,
            visible: false,
            dataEdit: null,
          });
        }}
        footer={null}
      >
        {controlFormCargos.dataEdit ? (
          <p className=" text-2xl text-center mb-6">
            Actualizar tarifa
          </p>
        ) : (
          <p className=" text-2xl text-center mb-6">Crear nuevo cargo</p>
        )}

        <Spin spinning={loandingSave}>
          <Form
            className="grid gap-2 grid-rows-6 grid-cols-2"
            onFinish={onSubmit}
            autoComplete="on"
            form={form}
            initialValues={controlFormCargos.dataEdit}
          //setfieldsvalue={controlFormCargos.dataEdit !== null ? edit() : onReset()}
          >
            {<Form.Item
              name="nombreCargo"
              label="Nombre del Cargo"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "El nombre del cargo es requerido",
                },
              ]}
            >
              <Select placeholder=" Seleccione el cargo" allowClear>
                {dataCargos.map((data) => (
                  <Option key={data.nombreCargo} value={data.nombreCargo}>
                    {data.nombreCargo}
                  </Option>
                ))}
              </Select>
            </Form.Item>}



            <Form.Item
              name="salarioHora"
              label="Salario por Hora"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "El salario por hora es requerido",
                },
              ]}
            >
              <Input placeholder="Salario por Hora" />
            </Form.Item>


            {/*                 <Select placeholder=" Seleccione el cargo" allowClear>
                  {cargo.map((data) => (
                    <Option key={data.idCargo} value={data.idCargo}>
                      {data.nombre}
                    </Option>
                  ))}
                </Select> */}


            <Form.Item
              name="descripcion"
              label="Descripción"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "La descripción del cargo es requerida",
                },
              ]}
            >
              <Input placeholder="Descripción" />
            </Form.Item>


            {/*                <Form.Item
                name="empleadoId"
                label="Empleado"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "El empleado es requerido",
                  },
                ]}
              >
                <Select placeholder=" Seleccione el empleado" allowClear>
                  {dataEmployee.map((data) => (
                    <Option key={data.empleadoId} value={data.empleadoId}>
                      {`${data.nombre} 
                      ${data.apellido}` }
                    </Option>
                  ))}
                </Select> 
                
              </Form.Item> */}


            {!controlFormCargos.dataEdit && (
              <Button type="primary" htmlType="reset" danger>
                Cancelar
              </Button>
            )}

            <Button type="primary" htmlType="submit">
              {!controlFormCargos.dataEdit ? ("Crear nuevo cargo") : ("Aceptar")}
            </Button>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
}

export default ModalFormCargos;
