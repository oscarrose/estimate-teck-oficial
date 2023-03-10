import React, { useEffect, useState, lazy, Suspense } from 'react'
import { message, Row, Col, Spin, Card, Button, Drawer } from "antd";
import DescriptionsItem from './DescriptionsItem';
const ProfileUser = () => {


  return (
    <div className="page-record-container">
      <Spin spinning={false}>
      <Row>
          <Col span={24} style={{
            padding: "0.2rem",
            backgroundColor: "#71B280",
            marginBottom: 14
          }}>
            <p
              className="title-item-profile"
            >
              Perfil del usuario
            </p>
          </Col>
        </Row>


        <Row style={{ marginLeft: "1rem", }}>

         
          <Col span={8}>
            <DescriptionsItem title="Nombre" content={"N/A"} />
          </Col>
          <Col span={8}>
            <DescriptionsItem title="Cargo" content={"N/A"} />
          </Col>
          <Col span={8}>
            <DescriptionsItem title="identificación" content={ "N/A"} />
          </Col>
          <Col span={8}>
            <DescriptionsItem title="Estado" content={"N/A"} />
          </Col>
        </Row>
        <hr />
        <Row>
          <Card
            style={{
              width: '100%'
            }}
            
          >
            <div>Formulario de password</div>
          </Card>
        </Row>
      </Spin>

    </div>
  )
}
export default ProfileUser
