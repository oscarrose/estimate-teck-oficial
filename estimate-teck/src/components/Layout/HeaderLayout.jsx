import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import UserInfo from "./UserInfo";
import { Layout, theme } from "antd";

const { Header } = Layout;

function HeaderLayout({ collapsed, setCollapsed }) {


  const {
    token: { colorBgContainer },
  } = theme.useToken();


  return (
    <>
      <Header
        style={{
          padding: '1.1rem',
          background: colorBgContainer,
          display:"flex",
          justifyContent:"space-between"
          
        }}
      >
      
        {React.createElement(
          collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          {
            className: "trigger",
            onClick: () => setCollapsed(!collapsed),
          }
        )}
        <div>
        <UserInfo/>
        </div>
      </Header>

    </>
  );
}

export default HeaderLayout;
