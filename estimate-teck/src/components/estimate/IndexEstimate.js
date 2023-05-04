import React, { useEffect } from "react";
import { Button, Divider, message, Space, Spin, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useParams, Link } from 'react-router-dom';
import CallApi from "../../ServicesHttp/CallApi";
import useEstimate from "../../hooks/useEstimate";
import DetalleEstimacion from "./DetalleEstimacion";
import PageEsperarEstimacion from "../pages/PageEsperarEstimacion";
import ParticipanteEstimacion from "./ParticipanteEstimacion";
import FormParametroEconomico from "./FormParametroEconomico";
let rute = process.env.REACT_APP_RUTE_VM

const { Title } = Typography;
function IndexEstimate() {

  const { idProyecto } = useParams();//Obtener el id del proyecto


  const { updateDetalleEstimacion, setInfoProyect, setDetalleEstimacion, detalleEstimacion, setLoadingDetalleEstimacion, loadingDetalleEstimacion, loadingEstimacion, setLoandingEstimacion } = useEstimate();

  /**
*Function para obtener los datos  del detalle de la estimacion
*/
  const fetchDataDetalleEstimacion = async () => {
    setLoadingDetalleEstimacion(true);
    await CallApi.get(`Estimacions/DetalleEstimacion/${idProyecto}`)
      .then((res) => {
        setDetalleEstimacion(res.data);
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
    setLoandingEstimacion(true);
    await CallApi.get(`Proyectos/oneProject/${idProyecto}`)
      .then((res) => {
        setInfoProyect(res.data);
        setLoandingEstimacion(false);
      })
      .catch((error) => {
        setLoandingEstimacion(false);
        message.error("Error Interno", error.message);
      });

  };

  useEffect(() => {
    fetchDataDetalleEstimacion()
    fetchInfoProject();
  }, [updateDetalleEstimacion]);

  // console.log("ads", detalleEstimacion.viewParticipanteEstimacion)
  return (
    <div className="grid grid-rows-2 grid-cols-1 p-3 bg-white container mx-auto">
      <Spin size="large" spinning={loadingEstimacion} className='container mx-auto p-5'>
        <Title>Estimación del proyecto</Title>
        <div>
          {!detalleEstimacion ? <Link

            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded"
            type="primary"
            icon={<PlusOutlined />}
            to={`${rute}form-estimate/project/${idProyecto}`}
          >
            Iniciar estimación
          </Link> : null}

        </div>


        {detalleEstimacion ?
          <DetalleEstimacion detalleEstimacion={detalleEstimacion} />
          : <PageEsperarEstimacion />}

      </Spin>
      {detalleEstimacion ? <>
        < ParticipanteEstimacion detalleEstimacion={detalleEstimacion} />

        < FormParametroEconomico detalleEstimacion={detalleEstimacion} />

      </> : null

      }

    </div>
  );
}

export default IndexEstimate;
