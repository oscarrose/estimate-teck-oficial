import { Divider, List } from 'antd';
import React from 'react';

function ListRequeriment({ dataRequeriment, setOpenForm, setEditRequirement }) {


  const data = dataRequeriment.map((item) => ({
    length: dataRequeriment.length,
    requerimientoId: item.requerimientoId,
    tipoRequerimientoId: item.tipoRequerimientoId,
    fechaCreacion: item.fechaCreacion,
    descripcion: item.descripcion,
    proyectoId: item.proyectoId,
    nombreProyecto: item.nombreProyecto,
    TipoRequerimiento: item.tipoRequerimiento,
    estado: item.estado,
    estadoId:item.estadoId
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
          key={item.tipoRequerimientoId}
          actions={[
            <a onClick={() => {
              setOpenForm(true)
              setEditRequirement({
                requerimientoId: item.requerimientoId,
                tipoRequerimientoId: item.tipoRequerimientoId,
                fechaCreacion: item.fechaCreacion,
                descripcion: item.descripcion,
                proyectoId: item.proyectoId,
                estadoId:item.estadoId
              })

            }}>
              Editar
            </a>
          ]}
        >
          <List.Item.Meta
            
            title={<span>{item.TipoRequerimiento}</span>}
            description={item.fechaCreacion}

          />
          {item.estado}
          <Divider/>
          {item.descripcion}

        </List.Item>
      )}
    />
  );
}
export default ListRequeriment;