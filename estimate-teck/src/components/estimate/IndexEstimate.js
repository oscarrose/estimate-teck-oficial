import React, { useEffect, useState } from "react";
import { Button, message, Spin, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useParams, Link } from 'react-router-dom';
import CallApi from "../../ServicesHttp/CallApi";
import useEstimate from "../../hooks/useEstimate";
let rute = process.env.REACT_APP_RUTE_VM

const { Title } = Typography;
function IndexEstimate() {

  const { idProyecto } = useParams();//Obtener el id del proyecto

  //Para saber cuando se estan obteniendo los datos
  const [loading, setLoanding] = useState(false);

  const { setInfoProyect } = useEstimate();


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
    fetchInfoProject();
  }, []);

  return (
    <div className="grid grid-rows-2 grid-cols-1 bg-white container mx-auto">
      <div className='container mx-auto p-5'>
        <Title>Estimación del proyecto</Title>
        <Spin spinning={loading}>
          <Link

            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded"
            type="primary"
            icon={<PlusOutlined />}
            to={`${rute}form-estimate/project/${idProyecto}`}
          >
            Iniciar estimación
          </Link>

        </Spin>
      </div>


    </div>
  );
}

export default IndexEstimate;
