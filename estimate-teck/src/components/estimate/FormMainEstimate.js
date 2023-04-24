import React, { useState, useCallback, useEffect } from 'react'
import { Button, message, Row, Steps, theme } from 'antd';
import { LeftOutlined } from "@ant-design/icons"
import { useParams } from 'react-router-dom';
import useEstimate from "../../hooks/useEstimate"
import Step1Form from './Step1Form';
import Step2From from './Step2Form';
import Step3From from './Step3Form';

export default function FormMainEstimate() {

  const { idProyecto } = useParams();//Obtener el id del proyecto

  const { step, setStep } = useEstimate();

  const { token } = theme.useToken();


  const [data, setData] = useState({});


  const steps = [
    {
      title: 'Clasificador inteligente de componentes del sistema',
      content: <Step1Form idProyecto={idProyecto} />
    },
    {
      title: 'Tecnologias a utilizar',
      content: <Step2From idProyecto={idProyecto} />
    },
    // {
    //   title: 'Hecho',
    //   content: <Step3From idProyecto={idProyecto} setStep={setStep} />
    // }
  ];

  // const next = useCallback(
  //   () => {


  //   }, [step]
  // );

 

  const handleSubmit = useCallback((data) => {
    setData(data);
    console.log("Data", data);
  }, []);

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorWhite,
    marginTop: 16
  };

  return (
    <div className='m-2'>

      {/*Container Steps */}
      <Steps
        className="site-navigation-steps"
        current={step} items={items} type="navigation"
        size="small" />
      {/* <div>{steps[step].content}</div> */}


      {/*Forms container*/}

      <div style={contentStyle}>{steps[step].content}</div>

      {/*Controls the button*/}
      <div style={{ marginTop: 24 }}>


        {/* {step < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            siguiente
          </Button>
        )} */}

        
      </div>
    </div >
  );
};

