import "./styles.css";
import React, { useState, useEffect } from "react";
import imgPortada from "../../asset/loginPortada.svg";
import cilindroGrey from "../../asset/cilindroGrey.svg";
import cilindroBlue from "../../asset/cilindroBlue.svg";
import CallApi from "../../ServicesHttp/CallApi";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth"


let rute = process.env.REACT_APP_RUTE_VM


const Login = () => {

  const { SaveSession, auth } = useAuth();

  const [isLogged, setLogged] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      if (auth != null) {

        navigate(rute + "home", { replace: true });
      }
    } catch (error) {
      message.error(error);
    }

  }, [auth, location, navigate]) //revisar la dependencia

  const onSubmit = async (values) => {
    console.log("Received values of form: ", values);
    setLogged(true)
    await CallApi.post("Auth/Login", values).then((res) => {
      console.log("res",res.data);
      // const emailUsuario = res?.data?.email;
      // const rol = res?.data?.rol;
      // const token = res?.data?.token;
      // const idUsuario = res?.data.idUsuario;
      //SaveSession({ emailUsuario, rol, token, idUsuario });
      setLogged(false)
      //navigate(rute + "home", { replace: true });
    }).catch((error) => {
      message.error(error.response.data)
      console.log("err",error)
      setLogged(false)
     

    });
  };
  const onFinish = (values) => {
    navigate("/home", { replace: true });
    console.log("Received values of form: ", values);
  };
  return (
    <div className="container  mx-auto ">
      <div className="grid grid-cols-3 ">
        <div className="fixed -top-72 -ml-96">
          <img className=" w-5/12" src={cilindroGrey} alt="" />
        </div>
        <div className="fixed top-72 -ml-72">
          <img className=" w-8/12" src={cilindroBlue} alt="" />
        </div>
        <div className="fixed right-96 pr-36 top-32">
          <img src={imgPortada} alt="Bienvenidos" />
          <Form
            name="normal_login"
            className="login-form "
            initialValues={{
              remember: true,
            }}
            onFinish={onSubmit}
          >
            <Form.Item
              name="userEmail"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresar su correo electronico!",
                  type:"email"
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresar su contraseña!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Contraseña"
              />
            </Form.Item>
            <Form.Item>
              <a className="login-form-forgot" href="">
                ¿Contraseña olvidada?
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Iniciar sesion
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Login;
