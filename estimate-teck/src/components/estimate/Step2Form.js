import React, { useState, useEffect, useCallback } from 'react'
import { Button, Form, Select, Spin, message } from 'antd';
import { CheckOutlined, LeftOutlined } from "@ant-design/icons"
import useEstimate from "../../hooks/useEstimate"
import CallApi from "../../ServicesHttp/CallApi";
const { Option } = Select;

function Step2From() {


  //Para saber cuando se estan obteniendo los datos
  const [loading, setLoanding] = useState(false);

  const { prev, setStep, saveProductivityPlatform, infoProyect, setSystemCharacteristic, setSaveProductivityPlatform } = useEstimate();

  const [productivity, setProductivity] = useState([])


  const evaluteFeatureSytemIA = async () => {
    setLoanding(true)
    await CallApi.post("http://localhost:8080/evaluate-feature-System", { tipoSistema: infoProyect.tipoProyecto })
      .then((res) => {
        //console.log("res!", JSON.parse(res.data.body))
        setSystemCharacteristic(JSON.parse(res.data.body))
        setLoanding(false);
      }).catch((error) => {
        message.error(error.message);
        setLoanding(false)
      });

  }

  /**
  *Function para obtener los datos  para la tabla de productividad
  */
  const fetchDataProductividad = useCallback(async function () {

    await CallApi.get("ProductividadPuntoFuncions/GetAllProductividad")
      .then((res) => {
        setProductivity(res.data);
      })
      .catch((error) => {

        message.error("Error Interno", error.message);
      });
  }, []);


  useEffect(() => {
    // La función se ejecutará solo una vez al montar el componente
    //evaluteFeatureSytemIA();
    fetchDataProductividad();
  }, []); // la matriz de dependencias está vacía





  // const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  const handlePlatformChange = (selectedValues) => {
    let productividadId = {
      productividadId: selectedValues
    }
    setSaveProductivityPlatform(productividadId);
    // console.log("1",productividadId)
  };

  const finishProjectEstimate = async () => {
    setLoanding(true)
    await CallApi.post("/",)
      .then((res) => {
        //console.log("res!", JSON.parse(res.data.body))
        setSystemCharacteristic(JSON.parse(res.data.body))
        setLoanding(false);
      }).catch((error) => {
        message.error(error.message);
        setLoanding(false)
      });

  }

  const handleFormSubmit = () => {
    //setSaveProductivityPlatform(values)
    console.log("guardar")

    //setStep((prev) => prev + 1)
  };

  return (
    <Spin size='large' spinning={loading}>

      <div className='m-5 mt-12'>
        <Form onFinish={handleFormSubmit}
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
            <Form.Item>
              <button type="primary"
                className='cursor-pointer bg-gray-300 border-none hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l'

                onClick={() => prev()}
              >
                <LeftOutlined />Atras
              </button>
            </Form.Item>

            <Form.Item >
              <Button type="primary" htmlType="submit">
                Finalizar estimación <CheckOutlined />
              </Button>
            </Form.Item>
          </div>

        </Form>

      </div>
    </Spin>
  )
}

export default Step2From