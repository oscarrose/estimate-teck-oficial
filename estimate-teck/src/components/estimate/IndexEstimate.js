import React, { useEffect, useState } from "react";
import { Button, Divider, message, Spin, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useParams, Link } from 'react-router-dom';
import CallApi from "../../ServicesHttp/CallApi";
import useEstimate from "../../hooks/useEstimate";
import DetalleEstimacion from "./DetalleEstimacion";
import PageEsperarEstimacion from "../pages/PageEsperarEstimacion";
import ParticipanteEstimacion from "./ParticipanteEstimacion";
let rute = process.env.REACT_APP_RUTE_VM

const { Title } = Typography;
function IndexEstimate() {

  const { idProyecto } = useParams();//Obtener el id del proyecto

  //Para saber cuando se estan obteniendo los datos
  const [loading, setLoanding] = useState(false);

  const { setInfoProyect } = useEstimate();

  const { setDetalleEstimacion, detalleEstimacion, setHaveEstimacion, setLoadingDetalleEstimacion, loadingDetalleEstimacion, } = useEstimate();

  /**
*Function para obtener los datos  del detalle de la estimacion
*/
  const fetchDataDetalleEstimacion = async () => {
    setLoadingDetalleEstimacion(true);
    await CallApi.get(`Estimacions/DetalleEstimacion/${idProyecto}`)
      .then((res) => {
        setDetalleEstimacion(res.data);
        console.log("data1", res.data);
        setLoadingDetalleEstimacion(false);
      })
      .catch((error) => {
        setLoadingDetalleEstimacion(false);
        message.error("Error Interno", error.message);
      });
  };
  /**
   *Function para obtener los datos  para la tabla de requerimiento
   */
  const fetchInfoProject = async () => {
    setLoanding(true);
    await CallApi.get(`Proyectos/oneProject/${idProyecto}`)
      .then((res) => {
        setInfoProyect(res.data);
        setLoanding(false);
      })
      .catch((error) => {
        setLoanding(false);
        message.error("Error Interno", error.message);
      });

  };



  useEffect(() => {
    fetchDataDetalleEstimacion()
    fetchInfoProject();
  }, []);

  return (
    <div className="grid grid-rows-2 grid-cols-1 bg-white container mx-auto">
      <div className='container mx-auto p-5'>
        <Title>Estimación del proyecto</Title>
        <Spin spinning={loading}>
          {!detalleEstimacion ? <Link

            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded"
            type="primary"
            icon={<PlusOutlined />}
            to={`${rute}form-estimate/project/${idProyecto}`}
          >
            Iniciar estimación
          </Link> : null}

        </Spin>
      

        {detalleEstimacion ?
          <DetalleEstimacion detalleEstimacion={detalleEstimacion} />
          : <PageEsperarEstimacion />}

      </div>

      < ParticipanteEstimacion detalleEstimacion={detalleEstimacion}/>
    </div>
  );
}

export default IndexEstimate;
