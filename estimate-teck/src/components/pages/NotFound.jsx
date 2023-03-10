import { Button, Result } from 'antd';

const NotFound = () => (
  <Result
    status="404"
    title="404"
    subTitle="Lo sentimos, la página que visitaste no existe."
    extra={<Button type="primary">Volver atrás</Button>}
  />

);


export default NotFound;