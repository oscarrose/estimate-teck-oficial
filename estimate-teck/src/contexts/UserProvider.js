import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

let rute = process.env.REACT_APP_RUTE_VM

//create the context
const UserContext = createContext({});



//create the context provider
const UserProvider = ({ children }) => {

    const navigate = useNavigate();

    const descriptarData = () => {
        if (window.sessionStorage.getItem("uss") == null) {
            return null
        }
        let bytes = CryptoJS.AES.decrypt(window.sessionStorage.getItem("uss"), '@Tierra@Luna@Sol');
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    const [auth, setAuth] = useState(descriptarData());

    const SaveSession = (data) => {
        window.sessionStorage.setItem("uss", incryData(data));
        setAuth(descriptarData())
    }

    const incryData = (data) => {
        return CryptoJS.AES.encrypt(JSON.stringify(data), '@Tierra@Luna@Sol').toString();
    }

    const CloseSession = () => {
        window.sessionStorage.removeItem("uss");
        setAuth(null)
        navigate(rute + "login", { replace: true })
    }

    return (
        <UserContext.Provider value={{ auth, setAuth, SaveSession, CloseSession }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserProvider }
export default UserContext;