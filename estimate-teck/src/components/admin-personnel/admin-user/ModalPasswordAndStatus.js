
import { useState } from 'react';
import { Modal, Spin } from 'antd';
import { message, Form } from 'antd';
import { Status } from './ItemStatus';


export default function ModalPasswordAndStatus({ visibleFormStatus, setVisibleFormStatus, changeUser,setChangeUser }) {


    const [form] = Form.useForm();

    //Para saber cuando termine de hacer la peticcion
    const [loading, setLoading] = useState(false)

    const onReset = () => {
        form.resetFields();
    };

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
                                <button className='btn-estado' key={valor.EstadoId} >
                                    {valor.Estado}
                                </button>)}
                        </Spin>
                    </div>
                </>
            </Modal>
        </div>
    )
}

