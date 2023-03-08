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
} from "@ant-design/icons";
import { Menu, Layout, theme } from "antd";


const { Sider} = Layout;

function SliderMenu({collapsed}) {
 

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
     
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={200}
        style={{
          background: colorBgContainer,
        }}
      >
        <div className="logo">
          <img className="w-24 ml-6" src={logoMenu} alt="Estimate-teck" />
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{
            height: "100%",
            borderRight: 0,
          }}
          items={[
            {
              key: "/estimate",
              icon: <CalendarOutlined />,
              label: <Link to={'/estimate'}>Estimacion</Link>,
            },
            {
              key: "/tariff",
              icon: <HistoryOutlined />,
              label: <Link to={'/tariff'}>Tarifario</Link>
            },
            {
              key: "/client",
              icon: <UserOutlined />,
              label: <Link to={'/client'}>Clientes</Link>,
            },
            {
              key: "4",
              icon: <DeploymentUnitOutlined />,
              label: "Plataforma de desarrollo",
            },
            {
              key: "5",
              icon: <FileTextOutlined />,
              label: "Reportes",
            },
            {
              key: "/admin-personnel",
              icon: <TeamOutlined />,
              label:<Link to="/admin-personnel">Manejo del personal</Link>
             
            },
          ]}
        />
      </Sider>
    </>
  );
}

export default SliderMenu;
