
import { useState } from 'react';
import { Modal, Spin } from 'antd';
import { message, Form } from 'antd';
//import { Status } from './ItemStatus';
import { Roles } from './ItemRolUser';
import CallApi from "../../../ServicesHttp/CallApi"


export default function ModalChangedRol({ visibleFormRol, setVisibleFormRol, changeUser,setUpdateTableUser }) {

    const [form] = Form.useForm();

    //Para saber cuando termine de hacer la peticcion
    const [loading, setLoading] = useState(false)

    const onReset = () => {
        form.resetFields();
    };

//Para cambiar de rol al usuario
const ChangeRolsUser = (data) => {
       
    setLoading(true)
    const objRol = {
        IdObj: changeUser,
        IdRol: data
    }
   
    CallApi.patch("Rol/ChangeRolsUser", objRol)
        .then(() => {
            message.success("Rol actualizado")
            setUpdateTableUser((prevData) => !prevData)
            setLoading(false)
            setVisibleFormRol(false);
        }).catch((error) => {
            setLoading(false)
            message.error(error.message);
        });

}


return (

    <div>
        <Modal

            centered
            open={visibleFormRol}
            footer={null}
            onCancel={() => { setVisibleFormRol(false); }}
        >
            <>
                <h2 className="text-center">Cambiar rol</h2>
                {/*Mapiar los estados que se puede cambiar el rol del usuario */}
                <div className='contenedor-btn-estado'>
                    <Spin spinning={loading}>
                        {Roles.map((valor) =>
                            <button className='btn-estado' key={valor.IdRol} onClick={() => ChangeRolsUser(valor.IdRol)} >
                                {valor.Nombre}
                            </button>)}
                    </Spin>
                </div>
            </>
        </Modal>
    </div>
)












}