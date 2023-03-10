import { message } from "antd";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AuthRequired = ({ allRoles }) => {
  const { auth } = useAuth();

  try {
    let verifyRol = allRoles.find((rol) => rol === auth.rol);
    if (auth === null) {
      return <Navigate to="login" replace />;
    }

    if (auth.rol !== verifyRol) {
      return <Navigate to="unauthorized" replace />;
    }
    if (auth.rol === verifyRol) {
      return <Outlet />;
    }
  } catch (error) {
   message.error(error)
  }
};

export default AuthRequired;
