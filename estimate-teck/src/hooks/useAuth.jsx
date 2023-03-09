import { useContext } from "react";
import UserContext from "../contexts/UserProvider";

const useAuth = () => {
  return useContext(UserContext);
}

export default useAuth