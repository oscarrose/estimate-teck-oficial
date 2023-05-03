import React, { useState, useEffect, useCallback } from 'react'
import { Button, Form, Select, Spin, message } from 'antd';
import { CheckOutlined, LeftOutlined } from "@ant-design/icons"
import useEstimate from "../../hooks/useEstimate"
import CallApi from "../../ServicesHttp/CallApi";
const { Option } = Select;

function Step2From({ idProyecto }) {


  //Para saber cuando se estan obteniendo los datos
  const [loading, setLoanding] = useState(false);

  const [loadingProductivity, setLoadingProductivity] = useState(false);

  const { finishEstimate, finishProjectEstimate, prev, saveProductivityPlatform, infoProyect, setSystemCharacteristic, setSaveProductivityPlatform, systemCharacteristc } = useEstimate();

  const [productivity, setProductivity] = useState([])



  /**
  *Function para obtener los datos  para la tabla de productividad
  */
  const fetchDataProductividad = useCallback(async function () {
    setLoanding(true)
    await CallApi.get("ProductividadPuntoFuncions/GetAllProductividad")
      .then((res) => {
        setLoanding(false);
        setProductivity(res.data);
        
      })
      .catch((error) => {
        setLoanding(false);
        message.error("Error Interno", error.message);
      });
  }, []);

  const evaluteFeatureSytemIA = async () => {

    setLoadingProductivity(true)
    await CallApi.post("http://localhost:8080/evaluate-feature-System", { tipoSistema: infoProyect.tipoProyecto })
      .then((res) => {

        const dataResponse = JSON.parse(res.data.body)
        const newData = dataResponse.map((item) => ({ ...item, proyectoId: idProyecto }));
        setSystemCharacteristic(newData);
        setLoadingProductivity(false)
      }).catch((error) => {
        message.error(error.message);
        setLoadingProductivity(false)
      });

  }
  useEffect(() => {
    if (!systemCharacteristc) {
      evaluteFeatureSytemIA();
    }
    // La función se ejecutará solo una vez al montar el componente
    fetchDataProductividad();
  }, []); // la matriz de dependencias está vacía


  // const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  // let productividadId = {
  //   productividadId: selectedValues
  // }
  const handlePlatformChange = (selectedValues) => {

    setSaveProductivityPlatform(selectedValues);
   
  };


  return (
    <Spin size='large' spinning={loading}>

      <div className='m-5 mt-12'>
        <Spin style={{
          fontSize: '18px'
        }}
          size='large' tip='Estimando...' spinning={finishEstimate} >
          <Form
            onFinish={finishProjectEstimate}
            initialValues={saveProductivityPlatform}
          >
            <Form.Item
              name="productividadId"
              label="Plataformas de desarrollo"
              rules={[
                {
                  required: true,
                  message: "Es requerido seleccionar la plataforma"
                }
              ]}
            >
              <Select
                mode="multiple"
                // defaultValue={saveProductivityPlatform}
                placeholder="Seleccione una o varias plataformas de desarrollo"
                onChange={handlePlatformChange}
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {productivity.map(platform => (
                  <Option key={platform.productividadId} value={platform.productividadId}>{platform.nombrePlataforma}</Option>
                ))}
              </Select>
            </Form.Item>
            {/* {selectedPlatforms.map(platform => (
          <React.Fragment key={platform}>
            <h3>{platform}</h3>
            <Form.Item label="Nivel Bajo" name={`nivelBajo-${platform}`} initialValue={0}>
              <InputNumber min={0} max={10} />
            </Form.Item>
            <Form.Item label="Nivel Medio" name={`nivelMedio-${platform}`} initialValue={0}>
              <InputNumber min={0} max={10} />
            </Form.Item>
            <Form.Item label="Nivel Alto" name={`nivelAlto-${platform}`} initialValue={0}>
              <InputNumber min={0} max={10} />
            </Form.Item>
          </React.Fragment>
        ))} */}
            <div className='flex justify-between m-12 '>

              {
                !loadingProductivity ?
                  <>
                    <Form.Item>
                      <button type="primary"
                        className='cursor-pointer bg-gray-300 border-none hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l'

                        onClick={() => prev()}
                      >
                        <LeftOutlined />Atras
                      </button>
                    </Form.Item>
                    <Form.Item >
                      <Button
                        type="primary" htmlType="submit">
                        Finalizar estimación <CheckOutlined />
                      </Button>
                    </Form.Item>
                  </>
                  :
                  <Button type="primary" loading>
                    Analizando información
                  </Button>
              }

            </div>



          </Form>
        </Spin>

      </div>
    </Spin>
  )
}

export default Step2From