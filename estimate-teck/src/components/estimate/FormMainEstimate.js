import React, { useState, useCallback } from 'react'
import { Button, message, Steps, theme } from 'antd';
import Step1Form from './Step1Form';
const steps = [
  {
    title: 'Identificar los componentes del sistema',
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
];

export default function FormMainEstimate() {

  const { token } = theme.useToken();

  const [data, setData] = useState({});

  const [step, setStep] = useState(1);


  const next = useCallback(
    (data) => {
      setData(data);
      setStep(step + 1);
    }, [step]
  );

  const prev = useCallback(
    (data) => {
      setData(data);
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
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  return (
    <div className='m-2'>

      {/*Container Steps */}
      <Steps current={step} items={items} />
      {step === 1 && <Step1Form data={data} onSuccess={next} />}

      {/*Forms container*/}
      {/* <div style={contentStyle}>{steps[step].content}</div> */}


      {/*Controls the button*/}
      <div style={{ marginTop: 24 }}>
        {/* {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}

        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}


        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )} */}
      </div>
    </div>
  );
};

