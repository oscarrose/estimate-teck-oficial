import React, { useState } from 'react'
import { Row, Col, Spin, Card, Button, Form, Input, notification } from "antd";
import CallApi from '../../../ServicesHttp/CallApi';
import DescriptionsItem from '../DescriptionsItem';
import useAuth from "../../../hooks/useAuth"
const ProfileUser = () => {
  const [form] = Form.useForm();


  //notification for when the discount is bigger than the total of the invoice
  const openNotificationWithIcon = (type, position, message) => {
    notification[type]({
      message: 'Notificación',
      description: message,
      placement: position,
    });
  };
  const { auth, CloseSession } = useAuth();

  const [loading, setLoanding] = useState(false);

  //Para ejecutar las petticiones de cambiar contraseña
  const onSubmit = async (values) => {
    setLoanding(true);
    const newValues = {
      ...values,
      userId: auth.idUsuario
    }
    await CallApi.patch("Usuarios/changePasswordUser", newValues)
      .then(() => {
        
        CloseSession();
      })
      .catch((error) => {
        setLoanding(false);
        openNotificationWithIcon('error', 'topRight', error.response.data)
        
      });
  };
  return (
    <div className="page-record-container">
      <Spin spinning={loading}>
        <Row>
          <Col span={24} style={{
            padding: "0.2rem",
            backgroundColor: "#00B4DB ",//#71B280
            marginBottom: 14
          }}>
            <h1
              className="title-item-profile"
            >
              Perfil del usuario
            </h1>
          </Col>
        </Row>


        <Row style={{ marginLeft: "1rem", }}>


          <Col span={8}>
            <DescriptionsItem title="Id usuario" content={auth.idUsuario} />
          </Col>
         
          <Col span={8}>
            <DescriptionsItem title="Rol" content={auth.rol} />
          </Col>
          <Col span={8}>
            <DescriptionsItem title="Nombre de usuario" content={auth.emailUsuario} />
          </Col>

        </Row>
        <hr />
        <Row>
          <Card
            style={{
              width: '100%'
            }}

          >
            <Spin className='w-80' spinning={false}>
              <Form

                className="grid gap-2 grid-rows-4 grid-cols-1"
                onFinish={onSubmit}
                autoComplete="off"
                form={form}
              >

                <Form.Item
                  name="oldPassword"
                  label="Contraseña actual"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "La contraseña actual es requerida",
                    },
                  ]}
                >
                  <Input.Password />

                </Form.Item>

                <Form.Item
                  name="newPassword"
                  label="Nueva contraseña"
                  hasFeedback
                  rules={[
                    {
                      min: 6,
                      message: 'Contraseña es muy corta!',
                    },
                    {
                      required: true,
                      message: "La nueva contraseña es requerida",
                    },
                  ]}
                >
                  <Input.Password />


                </Form.Item>
                <Form.Item
                  name="confirmPassword"
                  label="Confirmar contraseña"
                  dependencies={['newPassword']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Por favor, confirme su contraseña!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Las dos contraseñas que ingresaste no coinciden!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <br />
                <Button type="primary" htmlType="submit">
                  Aceptar
                </Button>
                <Button type="primary" htmlType="reset" danger>
                  Cancelar
                </Button>

              </Form>
            </Spin>
          </Card>
        </Row>
      </Spin>

    </div>
  )
}
export default ProfileUser
