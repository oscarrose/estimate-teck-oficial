import React, { useState } from 'react'
import { Drawer, Form, Button, Spin, message, Space } from 'antd'
import { useNavigate } from 'react-router-dom';
import CallApi from '../../ServicesHttp/CallApi';
import FormRequirementDynamic from './FormRequirementDynamic';
import useEstimate from '../../hooks/useEstimate';
let rute = process.env.REACT_APP_RUTE_VM
const FormRequirement = ({ openForm, setOpenForm, editRequirement, setEditRequirement, setUpdateTable, idProyecto, setDataRequeriment }) => {

    const [isLoading, setLoanding] = useState(false);

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { setDataIaRequirement } = useEstimate();

    //funcion para registrar los requerimientos
    const registerRequirement = async (values) => {
        setLoanding(true)
        await CallApi.post("http://localhost:8080/software-requirements", values).then((res) => {
            console.log("node", res.data.body)
            setDataIaRequirement(res.data.body)
            form.resetFields()
            setOpenForm(false)
            setLoanding(false)
            navigate(rute + `project/requirement-generations/${idProyecto}`, { replace: true });
            //setUpdateTable((updateTable) => !updateTable)
            //message.success("Guardado correctamente")

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
                message.error(error.message ?? error.response.data);
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
                placement="top" size='large' onClose={() => {
                    setOpenForm(false);
                    setEditRequirement(null)
                }}
                open={openForm} >
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