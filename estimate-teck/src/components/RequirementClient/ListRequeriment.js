import { List } from 'antd';
import React from 'react';

function ListRequeriment({dataRequeriment}) {

  
  const data=dataRequeriment.map((item) =>({
    length:dataRequeriment.length,
    tipoRequerimiento: item.tipoRequerimiento,
    fechaCreacion: item.fechaCreacion,
    descripcion:item.descripcion,
    proyectoId:item.proyectoId,
    nombreProyecto:item.nombreProyecto,
    requerimientoId:item.requerimientoId,

  }));

 
 return (
  <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 2,
    }}
    dataSource={data}

    renderItem={(item) => (
      <List.Item
        key={item.requerimientoId}
        actions={[
          <a onClick={() => console.log(item)}>
            Editar
          </a>
        ]}
      >
        <List.Item.Meta
          title={<span>{item.tipoRequerimiento}</span>}
          description={item.fechaCreacion}
        />
        {item.descripcion}
      </List.Item>
    )}
  />
);}
export default ListRequeriment;