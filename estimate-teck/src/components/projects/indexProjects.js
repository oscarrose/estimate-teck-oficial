import React, { useState, useEffect, useCallback } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import TableProject from "./TableProject";
import FormProjects from "./FormProjects";
import CallApi from "../../ServicesHttp/CallApi";
import { Link } from "react-router-dom";

function IndexEstimate() {


  const [dataTableProject, setDataTableProject] = useState([]);

 
  const [loading, setLoading] = useState(false)

  /**
   *Function para obtener los datos  para la tabla de project
   */
  const fetchDataProject = useCallback(async function () {
    setLoading(true);
    await CallApi.get("Proyectos/listProject")
      .then((res) => {
        setDataTableProject(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        message.error("Error Interno", error.message);
      });
  }, []);

  useEffect(() => {
    fetchDataProject();

  }, []);


  return (
    <div className="grid grid-rows-2 bg-white container mx-auto">
      <div className="justify-self-end row-span-2 m-2">
        <Button

          size="large"
          className="mr-10"
          type="primary"
          icon={<PlusOutlined />}

        >
          <Link to={"/register/projects"}> Nuevo proyecto</Link>

        </Button>
      </div>
      <div>
        <TableProject
        
          dataTableProject={dataTableProject}
        />

        

      </div>


    </div>
  );
}

export default IndexEstimate;
