import React, { useState } from "react";
import useModuleCargos from "../../hooks/useModuleCargos";
import { Modal, Form, Input, Select, Spin, Button, message, DatePicker, notification } from "antd";
import CallApi from "../../ServicesHttp/CallApi";
import moment from 'moment';
import { estadoUsuarioEmpleado } from "./ItemsSelect";
import useAuth from '../../hooks/useAuth';
const { Option } = Select;

const dateFormat = 'YYYY-MM-DD';

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

  const [Minor, setMinor] = useState(false);

  const {dataCargos} = useModuleCargos();

  const notifyOnlyMinorAge = () => {


    setMinor(true)

    notification['warning']({

      message: 'Notificación',

      description:

        'El empleado no puede ser menor de edad'

    });

  };


  const validateYear = (date) => {

    const dateCurrent = new Date();

    let yearCurrent = parseInt(dateCurrent.getFullYear());

    let monthCurrent = parseInt(dateCurrent.getMonth()) + 1;

    let dayCurrent = parseInt(dateCurrent.getDate());

    let yearBirth = parseInt(date.year());

    let monthBirth = parseInt(date.month() + 1);

    let dayBirth = parseInt(date.date());


    let age = yearCurrent - yearBirth;

    if (monthCurrent < monthBirth) {

      age--;

    }

    if (monthCurrent === monthBirth && dayCurrent < dayBirth) {

      age--;

    }

    if (age < 18) {

      notifyOnlyMinorAge()

    } else {

      setMinor(false)

    }


  };

  const { auth } = useAuth();

  
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
      fechaNacimiento: moment(editEmployee.fechaNacimiento, dateFormat),
      calle: editEmployee.calle,
      sector: editEmployee.sector,
      estadoId: editEmployee.estadoId,
      provincia: editEmployee.provincia,
      pais: editEmployee.pais,
      direccion: editEmployee.direccion
    });
  };

  // const [fileList, setFileList] = useState([
  //   {
  //   }
  // ]);
  // const onChange = ({ fileList: newFileList }) => {
  //   setFileList(newFileList);
  // };
  // const onPreview = async (file) => {
  //   let src = file.url;
  //   if (!src) {
  //     src = await new Promise((resolve) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file.originFileObj);
  //       reader.onload = () => resolve(reader.result);
  //     });
  //   }
  //   const image = new Image();
  //   image.src = src;
  //   const imgWindow = window.open(src);
  //   imgWindow?.document.write(image.outerHTML);
  // };

  const [loandingSave, setLoandingSave] = useState(false);

  //Para las peticciones de crear y actualizar
  const onSubmit = async (values) => {
    setLoandingSave(true)
    if (!editEmployee) {
      const valuesNew = {
        ...values,
        creadoPor: auth.emailUsuario
      }
     
      await CallApi.post("Empleados/CreateEmployee", valuesNew)


        .then((res) => {
          setLoandingSave(false);
          message.success("Registrado correctamente");
          setDataEmployee((prevData) => prevData.concat(res.data));
          onReset();
        })
        .catch((error) => {
          setLoandingSave(false);
          message.error(error.response.data);
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
      ).then(() => {
        message.success("Datos del empleado actualizados")
        setModalFormEmployee(false);
        setEditEmployee(null);
        setLoandingSave(false);
        setUpdateTableEmployee((prevData) => !prevData);
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

        width={1000}
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
            className="grid gap-2 grid-rows-3 grid-cols-2"
            onFinish={onSubmit}
            //onSubmit={onSubmit}
            autoComplete="off"
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

            {/* <Geography
              locationTitle="Country"
              isCountry
              onChange={setCountry}
            />
            <Geography
              locationTitle="State"
              onChange={setState}
              geoId={country}
            /> */}

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
                {
                  min: 13,
                  message: "Numero de cédula es muy corto",
                },
              ]}
            >
              <Input placeholder="###-#######-#" />
            </Form.Item>


            <Form.Item

              name="fechaNacimiento"

              label="Fecha nacimiento"

              rules={[

                {

                  required: true,

                  message: "Fecha nacimiento es requerida!"

                }

              ]}

            >

              <DatePicker onChange={validateYear}

                format={dateFormat} />

            </Form.Item>


            {/*             <Form.Item
              name="fechaNacimiento"
              label="Fecha nacimiento"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "La fecha de nacimiento es requerida",
                },

              ]}
            >
              <DatePicker format={dateFormat} />
            </Form.Item> */}

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
              <Input type="email" placeholder="###@####.###" />
            </Form.Item>

            {<Form.Item
              name="cargoId"
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
                  <Option key={data.cargoId} value={data.cargoId}>
                    {data.nombreCargo}
                  </Option>
                ))}
              </Select>
            </Form.Item>}
            
{/*             <Select placeholder=" Seleccione la ocupacion en la empresa" allowClear>
              {cargo.map((data) => (
                <Option key={data.idCargo} value={data.idCargo}>
                  {data.nombre}
                </Option>
              ))}
            </Select> */}
       

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
            <Input />
          </Form.Item>

          <Form.Item name="estado" label="Estado"
            rules={[
              {
                required: true,
                message: "El estado es necesario!",
              },
            ]}
            hasFeedback>
            <Input />
          </Form.Item>

          <Form.Item name="ciudad" label="Ciudad"
            rules={[
              {
                required: true,
                message: "La ciudad es necesaria!",
              },
            ]}
            hasFeedback>
            <Input />
          </Form.Item>

          <Form.Item
            name="direccion"
            label="Dirección"
            hasFeedback
            rules={[
              {
                required: true,
                message: "La dirección es requerida",
              },
            ]}
          >
            <Input placeholder="Sector, nombre de la calle, No. casa" />
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
          <Button type="primary" disabled={Minor} htmlType="submit">
            Guardar
          </Button>

        </Form>

      </Spin>

    </Modal>

      {/* 
            <Geography
              locationTitle="Ciudad: "
              onChange={setCity}
              geoId={state}
            /> */}
    </div >
  );
}

export default ModalFormEmployee;
