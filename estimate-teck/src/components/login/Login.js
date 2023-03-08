import "./styles.css";
import imgPortada from "../../asset/loginPortada.svg";
import cilindroGrey from "../../asset/cilindroGrey.svg";
import cilindroBlue from "../../asset/cilindroBlue.svg";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresar su correo electronico!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Usuario"
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
