import React, { useEffect, useState, useCallback } from "react";
import { Button, message, Spin, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useParams } from 'react-router-dom';
import CallApi from "../../ServicesHttp/CallApi";
import ListRequeriment from "./ListRequeriment";
import FormRequirement from "./FormRequirement";
const { Title } = Typography;
function IndexRequerClient() {

  const { idProyecto } = useParams();//Obtener el id del proyecto

  //Para saber cuando se estan obteniendo los datos
  const [loading, setLoanding] = useState(false);

  const [dataRequeriment, setDataRequeriment] = useState([]);

  //estado para controlar la vista del formulario 
  const [openForm, setOpenForm]=useState(false);

  //Estado para editar requerimiento
  const [editRequirement, setEditRequirement]=useState(null);

  /**
   *Function para obtener los datos  para la tabla de requerimiento
   */
  const fetchRequirementByProject = async () => {
    setLoanding(true);
    await CallApi.get(`RequerimientosClientes/RequerimientoByProyecto/${idProyecto}`)
      .then((res) => {
        setDataRequeriment(res.data);
        //console.log("de", res.data)
        setLoanding(false);
      })
      .catch((error) => {
        setLoanding(false);
        message.error("Error Interno", error.message);
      });
  };

  useEffect(() => {
    fetchRequirementByProject();
  }, []);

  return (
    <div className="grid grid-rows-2 grid-cols-1 bg-white container mx-auto">
      <div className='container mx-auto p-5'>
        <Title>Requerimientos del cliente</Title>
       <Spin spinning={loading}>
       <Button
          className="mr-10"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() =>
            setOpenForm(true)
          }
        >
          agregar requerimientos
        </Button>
        <div>
          <ListRequeriment
          setEditRequirement={setEditRequirement}
          setOpenForm={setOpenForm}
            dataRequeriment={dataRequeriment}
          />
        </div>
       </Spin>
      </div>
      <FormRequirement 
      setEditRequirement={setEditRequirement}
      editRequirement={editRequirement}
      idProyecto={idProyecto}
      openForm={openForm} setOpenForm={setOpenForm}/>

    </div>
  );
}

export default IndexRequerClient;
