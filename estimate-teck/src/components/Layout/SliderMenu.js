import React from "react";
import { Link } from "react-router-dom";
import logoMenu from "../../asset/logoMenu.svg";
import {
  HistoryOutlined,
  UserOutlined,
  CalendarOutlined,
  DeploymentUnitOutlined,
  FileTextOutlined,
  TeamOutlined,
  SettingOutlined,
  HomeOutlined
} from "@ant-design/icons";
import { Menu, Layout, theme } from "antd";
import useAuth from "../../hooks/useAuth"

const { Sider } = Layout;

function SliderMenu({ collapsed }) {

  const { auth } = useAuth();
  // const {
  //   token: { colorText },
  // } = theme.useToken();
  function getItem(label, key, icon, type) {
    return {
      key,
      icon,
      label,
      type,
    };
  }

  const items = [
    getItem(<Link to={'/home'}>Inicio</Link>, "/home", <HomeOutlined />, {
      type: 'divider',
    },),

    (auth.rol === "Gerente general" || auth.rol === "Encargado de proyectos") &&
    getItem(<Link to={'/projects'}>Proyectos</Link>, "/projects", <CalendarOutlined />, {
      type: 'divider',
    },),

    (auth.rol === "Gerente general" || auth.rol === "Encargado de proyectos") &&
    getItem(<Link to={'/client'}>Clientes</Link>, "/client", <UserOutlined />, {
      type: 'divider',
    },),

    (auth.rol === "Gerente de TIC") && getItem(<Link to="/admin-personnel">Manejo del personal</Link>, "/admin-personnel", <TeamOutlined />, {
      type: 'divider',
    },),

    (auth.rol === "Gerente general") &&
    getItem(<Link to={'/cargos'}>Cargos / Tarifario</Link>, "/cargos", <HistoryOutlined />, {
      type: 'divider',
    },),
    (auth.rol === "Gerente general") &&
    getItem(<Link to={'/productividadpf'}>Plataforma de desarrollo</Link>, "/productividadpf", <DeploymentUnitOutlined />, {
      type: 'divider',
    },),
    (auth.rol === "Gerente general") &&
    getItem(<Link to={'/null1'}>Reportes</Link>, "/null1", <FileTextOutlined />, {
      type: 'divider',
    },),



    getItem(<Link to="/profile">Cuenta</Link>, "/profile", <SettingOutlined />, {
      type: 'divider',
    },),



  ];

  return (
    <>

      <Sider
      
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={200}
       

      >
        <div className="logo">
          <img className="w-32"src={logoMenu} alt="Estimate-teck" />
        </div>
        <Menu
          //className="bg-black"
          theme="dark"
          mode="inline"
          items={items}
        />
      </Sider>
    </>
  );
}

export default SliderMenu;
