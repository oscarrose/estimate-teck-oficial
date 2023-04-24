import React, { useState } from 'react'
import { Drawer, Form, Button, Spin, message } from 'antd'
import {BulbOutlined} from "@ant-design/icons"
import {useNavigate } from 'react-router-dom';
import CallApi from '../../ServicesHttp/CallApi';
import FormRequirementDynamic from './FormRequirementDynamic';
import useEstimate from '../../hooks/useEstimate';


let rute = process.env.REACT_APP_RUTE_VM
const FormRequirement = ({ openForm, setOpenForm, editRequirement, setEditRequirement, setUpdateTable, idProyecto, setDataRequeriment }) => {

    const [isLoading, setLoanding] = useState(false);

    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { dataIaRequirement, setDataIaRequirement } = useEstimate();

    //funcion para ingresar los requerimientos los requerimientos
    const icomeRequirement = async (values) => {
        setLoanding(true)
        await CallApi.post("http://localhost:8080/software-requirements", values).then((res) => {
            
            setDataIaRequirement({
                ...dataIaRequirement,
                requisitos: JSON.parse(res.data.body)
            })
            form.resetFields()
            setOpenForm(false)
            setLoanding(false)
            navigate(rute + `project/requirement-generations/${idProyecto}`, { replace: true });

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
            icomeRequirement(values)
        })
    }

    return (
        <>
            <Drawer title={"Ingreso de requerimientos"}
                placement="top" size='large' onClose={() => {
                    setOpenForm(false);
                    setEditRequirement(null)
                }}
                open={openForm} >
                <Spin size='large' spinning={isLoading}>
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
                             <BulbOutlined />   Generar requerimientos
                            </Button>
                        </Form.Item>

                    </Form>
                </Spin>

            </Drawer>
        </>
    )
}

export default FormRequirement;