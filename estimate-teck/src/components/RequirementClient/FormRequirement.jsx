import React, { useState } from 'react'
import { Drawer, Form, Button, Spin, message } from 'antd'
import CallApi from '../../ServicesHttp/CallApi';
import FormRequirementDynamic from './FormRequirementDynamic';
const FormRequirement = ({ openForm, setOpenForm, editRequirement, setEditRequirement,setUpdateTable,idProyecto,setDataRequeriment }) => {

    const [isLoading, setLoanding] = useState(false);

    const [form] = Form.useForm();

    //funcion para registrar los requerimientos
    const registerRequirement = async (values) => {
        setLoanding(true)
        await CallApi.post("RequerimientosClientes/RegisterRequirement", values).then((res) => {
            setUpdateTable((updateTable) => !updateTable)
            form.resetFields()
            setOpenForm(false)
            message.success("Guardado correctamente")
            setLoanding(false)
        }).catch((error) => {
            message.error(error.message);
            setLoanding(false)
          
        });

    }

    const updateRequirement = async (values) => {
        setLoanding(true)
        let newValue = {
            ...editRequirement,
            ...values.RequerimientosClientes[0]
        }
        console.log("edit", newValue)
        await CallApi.put(`RequerimientosClientes/PutRequerimientos/${newValue.requerimientoId}`, newValue)
        .then(() => {
            setEditRequirement(null)
            setLoanding(false)
            setOpenForm(false)
            setUpdateTable((updateTable) => !updateTable)
            message.success("Actualizado correctamente")

        }).catch((error) => {
            setLoanding(false)
            message.error( error.message ?? error.response.data );
        });

    }
    const validateForm = () => {
        form.validateFields().then((values) => {
            if (editRequirement) {
                updateRequirement(values)
            } else {
                registerRequirement(values)
            }
        })
    }

    return (
        <>
            <Drawer title={!editRequirement ? "Registrar requerimientos" : "Actualizar requerimiento"}
                placement="right" onClose={() => {
                    setOpenForm(false);
                    setEditRequirement(null)
                }}
                open={openForm} width={1000}>
                <Spin spinning={isLoading}>
                    <Form
                        form={form}
                        layout="vertical"
                        name='formRequirement'
                    >

                        <FormRequirementDynamic
                            editRequirement={editRequirement}

                         ProyectoId={idProyecto}
                        />
                        <Form.Item >
                            <Button
                                type="primary"
                                onClick={() => validateForm()}

                            >
                                {editRequirement ? " Guardar cambio" : " Guardar requerimientos"}
                            </Button>
                        </Form.Item>

                    </Form>
                </Spin>

            </Drawer>
        </>
    )
}

export default FormRequirement;