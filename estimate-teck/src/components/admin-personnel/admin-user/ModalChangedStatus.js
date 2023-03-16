
import { useState } from 'react';
import { Modal, Spin } from 'antd';
import { message, Form } from 'antd';
import { Status } from './ItemStatus';
import CallApi from "../../../ServicesHttp/CallApi"

export default function ModalChangeStatus({ visibleFormStatus, setVisibleFormStatus, changeUser,setUpdateTableUser }) {


    const [form] = Form.useForm();

    //Para saber cuando termine de hacer la peticcion
    const [loading, setLoading] = useState(false)

    const onReset = () => {
        form.resetFields();
    };

    //Para cambiar de estado al usuario
    const changeStateUser = (data) => {
       
        setLoading(true)
        const objStatu = {
            idObjectivo: changeUser,
            idEstado: data
        }
       
        CallApi.patch("Usuarios/ChangeStatusUser", objStatu)
            .then(() => {
                message.success("Estado actualizado")
                setUpdateTableUser((prevData) => !prevData)
                setLoading(false)
                setVisibleFormStatus(false);
            }).catch((error) => {
                setLoading(false)
                message.error(error.message);
            });

    }

    return (

        <div>
            <Modal

                centered
                open={visibleFormStatus}
                footer={null}
                onCancel={() => { setVisibleFormStatus(false); }}
            >
                <>
                    <h2 className="text-center">Cambiar estado</h2>
                    {/*Mapiar los estados que se puede cambiar el usuario */}
                    <div className='contenedor-btn-estado'>
                        <Spin spinning={loading}>
                            {Status.map((valor) =>
                                <button className='btn-estado' key={valor.EstadoId} onClick={() => changeStateUser(valor.EstadoId)} >
                                    {valor.Estado}
                                </button>)}
                        </Spin>
                    </div>
                </>
            </Modal>
        </div>
    )
}

