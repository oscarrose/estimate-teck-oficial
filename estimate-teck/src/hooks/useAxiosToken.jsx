import { useEffect } from "react";
import { axiosToken } from "../ServicesHttp/CallApi";
import useAuth from "./useAuth";

const useAxiosToken = () => {


    const { auth } = useAuth();

    useEffect(() => {
        const requestAxiosInterceptors = axiosToken.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `bearer ${auth?.token}`;
                }
               
                return config;
            }, (error) => Promise.reject(error)
          
        );

        const responseAxiosInterceptors = axiosToken.interceptors.response.use(
            response => response,
            (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    window.alert("Petición rechazada")
                }
               
                return Promise.reject(error);
            }

        )
        return () => {
            axiosToken.interceptors.request.eject(requestAxiosInterceptors);
            axiosToken.interceptors.response.eject(responseAxiosInterceptors)
        }
    }, [])

    return axiosToken
}

export default useAxiosToken