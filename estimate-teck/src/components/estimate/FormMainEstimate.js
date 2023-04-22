import React, { useState, useCallback, useEffect } from 'react'
import { Button, message, Steps, theme } from 'antd';
import { useParams } from 'react-router-dom';
import useEstimate from "../../hooks/useEstimate"
import Step1Form from './Step1Form';
import Step2From from './Step2Form';
import Step3From from './Step3Form';

export default function FormMainEstimate() {

  const { idProyecto } = useParams();//Obtener el id del proyecto

  const {step,setStep}=useEstimate();

  const { token } = theme.useToken();


  const [data, setData] = useState({});

 
  

  const [systeCharacteristc, setSystemCharacteristic]=useState()


  const steps = [
    {
      title: 'Clasificador inteligente de componentes del sistema',
      content: <Step1Form  idProyecto={idProyecto}/>
    },
    {
      title: 'Calcular del Factor de Ajuste',
      content: <Step2From setSystemCharacteristic={setSystemCharacteristic} systeCharacteristc={systeCharacteristc} idProyecto={idProyecto} setStep={setStep} />
    },
    {
      title: 'Paso siguiente',
      content: <Step3From idProyecto={idProyecto} setStep={setStep} />
    }
  ];

  // const next = useCallback(
  //   () => {


  //   }, [step]
  // );

  const prev = useCallback(
    () => {
      setStep(step - 1);
    }, [step]
  );


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

        {step > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            atras
          </Button>
        )}
      </div>
    </div >
  );
};

