import { useState, useEffect } from "react";
import CallApi from "../ServicesHttp/CallApi";
import {message } from "antd";
const useClient=()=>{

 //Para la data de la tabla de cliente
 const [dataClient, setDataClient] = useState([]);
  //Para saber cuando se estan obteniendo los datos de la tabla de clente
  const [loading, setLoanding] = useState(false);

   
  /*Para saber cuando actualizar la tabla 
  luego de un cambio en los datos de algun cliente*/
  const [updateTableClient, setUpdateTableClient] = useState(false);

 
  /**
   *Function para obtener los datos  para la tabla de empleados
   */
   const fetchDataClient=async()=>  {
    setLoanding(true);
    await CallApi.get("Client/GetAllClient")
      .then((res) => {
        setDataClient(res.data);
        setLoanding(false);
      })
      .catch((error) => {
        setLoanding(false);
        message.error("Error Interno", error.message);
      });
  };

  useEffect(() => {
    fetchDataClient();
  }, [updateTableClient]);


    return{
      dataClient,
      setDataClient,
      loading,
      setLoanding,
      setUpdateTableClient
    }
}
export default useClient;