import "../Layout/styleLayout.css";
import React from "react";
import { Layout, theme } from "antd";
import SliderMenu from "./SliderMenu";
import HeaderLayout from "./HeaderLayout";
import useLayoutState from "../../hooks/useLayoutState";

const { Content } = Layout;

const LayoutApp = ({children}) => {
 
  const { collapsed, setCollapsed } = useLayoutState();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
     <SliderMenu collapsed={collapsed}/>
      <Layout className="site-layout">
        <HeaderLayout collapsed={collapsed} setCollapsed={setCollapsed}/>
        <Content
          style={{
            margin: "24px 16px ",
            padding: 0,
            minHeight: 565,
            background: colorBgContainer,
          }}
          className="container mx-auto"
        >
         {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutApp;
