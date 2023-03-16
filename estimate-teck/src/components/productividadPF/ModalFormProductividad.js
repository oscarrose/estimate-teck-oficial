import React, { useState } from "react";
import { Modal, Form, Input, Spin, Button, message, Select } from "antd";
import CallApi from "../../ServicesHttp/CallApi";
import { estadoProductividad } from "./ItemSelectProductividad";
import useAuth from "../../hooks/useAuth";

const { Option } = Select;

function ModalFormProductividad({
  setDataProductividad,
  setControlFormProductividad,
  controlFormProductividad,
  setUpdateTableProductividad
}) {
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };
  const {auth}=useAuth();
  //Asginar los valores a editar
  /* const edit = () => {
     form.setFieldsValue({
      nombre: controlFormProductividad.dataEdit.nombre,
      apellido: controlFormProductividad.dataEdit.apellido,
      identificacion: controlFormProductividad.dataEdit.identificacion,
      celular: controlFormProductividad.dataEdit.celular,
      email: controlFormProductividad.dataEdit.email,
      telefonoResidencial: controlFormProductividad.dataEdit.telefonoResidencial,
     
      ciudad: controlFormProductividad.dataEdit.ciudad,
      calle: controlFormProductividad.dataEdit.calle,
      sector: controlFormProductividad.dataEdit.sector,
     
    });
  };*/

  const [loandingSave, setLoandingSave] = useState(false);

  //Para las peticciones de crear y actualizar
   const onSubmit = async (values) => {
    
    setLoandingSave(true);
    if (!controlFormProductividad.dataEdit) {
      const objNew={
        ...values,
        usuarioId:auth.idUsuario
      }
      await CallApi.post("ProductividadPuntoFuncions/CreateProductividad", objNew)
        .then((res) => {
          
          message.success("Registrada correctamente");
          onReset();
          setDataProductividad((prevData) => prevData.concat(res.data));
          setLoandingSave(false);
        })
        .catch((error) => {
          setLoandingSave(false);
          message.error("Error interno", error.message);
        });


    } else {

      const newValues = {
        ...values,
        fechaCreacion: controlFormProductividad.dataEdit.fechaCreacion,
        productividadId: controlFormProductividad.dataEdit.productividadId,
        usuarioId:auth.idUsuario
      };
      
      await CallApi.put(
        `ProductividadPuntoFuncions/PutProductividad/${controlFormProductividad.dataEdit.productividadId}`,
        newValues
      )
        .then(() => {
          setUpdateTableProductividad((prevData) => !prevData)
          message.success("Datos de la plataforma actualizados");
          
          setLoandingSave(false);
          setControlFormProductividad({
            
            
            dataEdit:null,
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
        open={controlFormProductividad.visible}
        onCancel={() => {
          // onReset();
          setControlFormProductividad({
            ...controlFormProductividad,
            visible: false,
            dataEdit: null,
          });
        }}
        footer={null}
      >
        {controlFormProductividad.dataEdit ? (
          <p className=" text-2xl text-center mb-6">
            Actualizar plataforma
          </p>
        ) : (
          <p className=" text-2xl text-center mb-6">Crear nueva plataforma</p>
        )}

        <Spin spinning={loandingSave}>
          <Form
            className="grid gap-2 grid-rows-6 grid-cols-2"
            onFinish={onSubmit}
            autoComplete="on"
            form={form}
            initialValues={controlFormProductividad.dataEdit}
          //setfieldsvalue={controlFormProductividad.dataEdit !== null ? edit() : onReset()}
          >
            <Form.Item
              name="nombrePlataforma"
              label="Nombre de la plataforma"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "El nombre de la plataforma es requerido",
                },
              ]}
            >
              <Input placeholder="Nombre de la plataforma" />
            </Form.Item>

            <Form.Item
              name="nivelBajo"
              label="Nivel bajo de productividad"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "El nivel bajo de productividad es requerido",
                },
              ]}
            >
              <Input placeholder="Nivel bajo de productividad" />
            </Form.Item>

            <Form.Item
              name="nivelMedio"
              label="Nivel medio de productividad"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "El nivel medio de productividad es requerido",
                },
              ]}
            >
              <Input placeholder="Nivel medio de productividad" />
            </Form.Item>

            <Form.Item
              name="nivelAlto"
              label="Nivel alto de productividad"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "El alto bajo de productividad es requerido",
                },
              ]}
            >
              <Input placeholder="Nivel alto de productividad" />
            </Form.Item>

            {controlFormProductividad.dataEdit && (
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
                  {estadoProductividad.map((data) => (
                    <Option key={data.idEstado} value={data.idEstado}>
                      {data.estado}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}


            {!controlFormProductividad.dataEdit && (
              <Button type="primary" htmlType="reset" danger>
                Cancelar
              </Button>
            )}

            <Button type="primary" htmlType="submit">
             {!controlFormProductividad.dataEdit ?("Crear nueva plataforma"):("Aceptar")}
            </Button>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
}

export default ModalFormProductividad;
