import React, { useState } from 'react'
import { Drawer, Form, Input, Button, Spin, message } from 'antd'
import CallApi from '../../ServicesHttp/CallApi';
import FormRequirementDynamic from './FormRequirementDynamic';
const FormRequirement = () => {


    const [isLoading, setLoanding] = useState(false);

    const [form] = Form.useForm();

    const registerRequirement = async (value) => {
        setLoanding(true)

        // if (value.ibarffaaDependientes === undefined) {
        //     return message.warning("No hay datos agregados")
        // }
        // await axiosPrivate.post('RecursosFacturaIbarffaa/RegisterDependent', value, {
        //     signal: controller.signal
        // }).then(() => {
        //     form.resetFields()
        //     setUpdateTable((updateTable) => !updateTable)
        //     setLoanding(false)
        //     setDependentFormState({
        //         ...dependentFormState,
        //         openDependent: false
        //     })
        //     message.success("Guardado correctamente")
        // }).catch((error) => {
        //     setLoanding(false)
        //     message.error(error.response.data ?? error.message);
        //     if (error.response.status === 401) {
        //         controller.abort();
        //         message.error("Sesión caducada");
        //     }

        // });

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
    // const validateForm = () => {
    //     form.validateFields().then((values) => {
    //         if (values.ibarffaaDependientes[0].idDependiente) {
    //             updateDependent(values.ibarffaaDependientes[0])
    //         } else {
    //             registerDependent(values)
    //         }
    //     })
    // }

    return (
        <>
            <Drawer title={"Formulario"}
                placement="right" onClose={null}
                open={true} width={1000}>
                <Spin spinning={isLoading}>
                    <Form
                        form={form}
                        layout="vertical"
                        name='formRequirement'
                    >
                        {/* <Form.Item
                            name="idPropetario"
                            initialValue={afiliado}
                            hidden={true}
                        >
                            <Input />
                        </Form.Item> */}
                        <FormRequirementDynamic />
                        <Form.Item >
                            <Button type="primary">
                                Guardar
                            </Button>
                        </Form.Item>

                    </Form>
                </Spin>

            </Drawer>
        </>
    )
}

export default FormRequirement;