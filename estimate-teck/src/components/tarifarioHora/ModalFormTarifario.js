import React, { useState } from "react";
import { Modal, Form, Input, Spin, Button, message, Select} from "antd";
import CallApi from "../../ServicesHttp/CallApi";
//import { estadoTarifario } from "./ItemSelectTarifario";
import useAuth from "../../hooks/useAuth";
import {cargo} from "../tarifarioHora/ItemSelectTarifario";
import useModuleAdminPersonnel from "../../hooks/useModuleAdminPersonnel";
const { Option } = Select;

function ModalFormTarifario({
  setDataTarifario,
  setControlFormTarifario,
  controlFormTarifario,
  setUpdateTableTarifario
}) {
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };
  const {auth}=useAuth();
  const {dataEmployee}=useModuleAdminPersonnel();
  //Asginar los valores a editar
  /* const edit = () => {
     form.setFieldsValue({
      nombre: controlFormTarifario.dataEdit.nombre,
      apellido: controlFormTarifario.dataEdit.apellido,
      identificacion: controlFormTarifario.dataEdit.identificacion,
      celular: controlFormTarifario.dataEdit.celular,
      email: controlFormTarifario.dataEdit.email,
      telefonoResidencial: controlFormTarifario.dataEdit.telefonoResidencial,
     
      ciudad: controlFormTarifario.dataEdit.ciudad,
      calle: controlFormTarifario.dataEdit.calle,
      sector: controlFormTarifario.dataEdit.sector,
     
    });
  };*/

  const [loandingSave, setLoandingSave] = useState(false);
  
  //Para las peticciones de crear y actualizar
   const onSubmit = async (values) => {
    
    setLoandingSave(true);
    if (!controlFormTarifario.dataEdit) {
      const objNew={
        ...values,
        usuarioId:auth.idUsuario
      }
      
      await CallApi.post("TarifarioHoras/CreateTarifarioHora", objNew)
        .then((res) => {
            
          message.success("Registrada correctamente");
          onReset();
          setDataTarifario((prevData) => prevData.concat(res.data));
          setLoandingSave(false);
        })
        .catch((error) => {
          setLoandingSave(false);
          message.error("Error interno", error.message);
        });


    } else {

      const newValues = {
        ...values,
        fechaCreacion: controlFormTarifario.dataEdit.fechaCreacion,
        tarifarioId: controlFormTarifario.dataEdit.tarifarioId,
        usuarioId:auth.idUsuario
        //empleadoName:controlFormTarifario.dataEdit.empleadoName
      };
      
      await CallApi.put(
        `TarifarioHoras/PutTarifarioHora/${controlFormTarifario.dataEdit.tarifarioId}`,
        newValues
      )
        .then(() => {
            
          setUpdateTableTarifario((prevData) => !prevData)
          
          message.success("Datos de tarifario actualizados");
          
          setLoandingSave(false);
          setControlFormTarifario({
            
            
            dataEdit:null,
            visible: false,
          });


        })
        .catch((error) => {
          setLoandingSave(false);
          message.error("Error interno", error.message);
          console.log("Revisar",newValues)
        });
    }
  }; 

  return (
    <div>
      <Modal
        width={800}
        centered
        open={controlFormTarifario.visible}
        onCancel={() => {
          // onReset();
          setControlFormTarifario({
            ...controlFormTarifario,
            visible: false,
            dataEdit: null,
          });
        }}
        footer={null}
      >
        {controlFormTarifario.dataEdit ? (
          <p className=" text-2xl text-center mb-6">
            Actualizar tarifa
          </p>
        ) : (
          <p className=" text-2xl text-center mb-6">Crear nueva tarifa</p>
        )}

        <Spin spinning={loandingSave}>
          <Form
            className="grid gap-2 grid-rows-6 grid-cols-2"
            onFinish={onSubmit}
            autoComplete="on"
            form={form}
            initialValues={controlFormTarifario.dataEdit}
          //setfieldsvalue={controlFormTarifario.dataEdit !== null ? edit() : onReset()}
          >
            <Form.Item
              name="montoTarifa"
              label="Monto tarifa"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "El monto de la tarifa es requerido",
                },
              ]}
            >
              <Input placeholder="Monto tarifa" />
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
                <Select placeholder=" Seleccione el cargo" allowClear>
                  {cargo.map((data) => (
                    <Option key={data.idCargo} value={data.idCargo}>
                      {data.nombre}
                    </Option>
                  ))}
                </Select>
                
              </Form.Item>

              <Form.Item
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
                
              </Form.Item>

            {!controlFormTarifario.dataEdit && (
              <Button type="primary" htmlType="reset" danger>
                Cancelar
              </Button>
            )}

            <Button type="primary" htmlType="submit">
             {!controlFormTarifario.dataEdit ?("Crear nueva plataforma"):("Aceptar")}
            </Button>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
}

export default ModalFormTarifario;
