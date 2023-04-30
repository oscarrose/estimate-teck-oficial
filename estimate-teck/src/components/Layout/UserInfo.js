import React from 'react';
import { Popconfirm } from 'antd';
import useAuth from '../../hooks/useAuth';
import {LogoutOutlined} from "@ant-design/icons"
import './Controlador.css'

const text = '¿Estás segura de cerrar session?';

const UserInfo = () => {

    const { auth, CloseSession } = useAuth();
    return (
        <>
            <div
                size="large"
                style={{ verticalAlign: 'middle'}}
            >
                <span className='text-xl'>{auth.emailUsuario}</span>
                <Popconfirm title={text} onConfirm={CloseSession} okText="Si" cancelText="No">
                    <a className='btncerrar'> <LogoutOutlined /></a>
                </Popconfirm>

            </div>
        </>
    );
}

export default UserInfo