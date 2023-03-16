import React from 'react';
import { Button, Result } from 'antd';

const Unauthorized = () => (
  <Result
    status="403"
    title="403"
    subTitle="Lo sentimos, no está autorizado para acceder a esta página."
    extra={<Button type="primary">Volver atrás</Button>}
  />

);

export default Unauthorized