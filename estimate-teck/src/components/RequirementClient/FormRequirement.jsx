import React, { useState } from 'react'
import { Drawer, Form, Input, Button, Spin, message } from 'antd'
import CallApi from '../../ServicesHttp/CallApi';
import FormRequirementDynamic from './FormRequirementDynamic';
const FormRequirement = ({ openForm, setOpenForm, 
    idProyecto,editRequirement,setEditRequirement }) => {


    console.log("edit",editRequirement)
    const [isLoading, setLoanding] = useState(false);

    const [form] = Form.useForm();

    //funcion para registrar los requerimientos
    const registerRequirement = async (values) => {
        setLoanding(true)
        await CallApi.post("RequerimientosClientes/RegisterRequirement", values).then(() => {
            form.resetFields()
            setLoanding(false)
            setOpenForm(false)
            message.success("Guardado correctamente")
        }).catch((error) => {
            console.log("err", error)
            setLoanding(false)
            message.error(error.response.data ?? error.message);
        });

    }

    const updateDependent = async (value) => {
        setLoanding(true)
        // let newValue = {
        //     ...dependentFormState.updateDependent,
        //     ...value
        // }
        // await axiosPrivate.put(`RecursosFacturaIbarffaa/updateDependent?IdDependiente=${newValue.idDependiente}`, newValue, {
        //     signal: controller.signal
        // }).then(() => {

        //     setUpdateTable((updateTable) => !updateTable)
        //     setLoanding(false)
        //     setDependentFormState({
        //         ...dependentFormState,
        //         dependentUpdate: null,
        //         openDependent: false
        //     })
        //     message.success("Actualizado correctamente")

        // }).catch((error) => {
        //     setLoanding(false)
        //     if (error.response.status === 401) {
        //         controller.abort();
        //         message.error("Sesión caducada");
        //     }
        //     message.error( error.message ?? error.response.data );
        // });

    }
    const validateForm = () => {
        form.validateFields().then((values) => {
            registerRequirement(values)
        })
    }

    return (
        <>
            <Drawer title={!editRequirement? "Registrar requerimientos":"Actualizar requerimiento"}
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
                                Guardar requerimientos
                            </Button>
                        </Form.Item>

                    </Form>
                </Spin>

            </Drawer>
        </>
    )
}

export default FormRequirement;