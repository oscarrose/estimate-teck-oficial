import React from 'react';
import { Popconfirm } from 'antd';
import useAuth from '../../hooks/useAuth';
import './Controlador.css'

const text = '¿Estás segura de cerrar session?';

const UserInfo = () => {

    const { auth, CloseSession } = useAuth();
    return (
        <>
            <div
                size="large"
                style={{ verticalAlign: 'middle', }}
            >
                <span>{auth.emailUsuario}</span>
                <Popconfirm title={text} onConfirm={CloseSession} okText="Si" cancelText="No">
                    <a className='btncerrar'>Cerrar session</a>
                </Popconfirm>

            </div>
        </>
    );
}

export default UserInfo