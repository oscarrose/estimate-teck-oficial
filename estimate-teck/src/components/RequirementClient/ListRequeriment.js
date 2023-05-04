import { Divider, List, Table, Card } from 'antd';
import React from 'react';

function ListRequeriment() {


  const requerimiento = [
    {
      "requerimientoId": 4,
      "proyectoId": 0,
      "tipoRequerimientoId": 0,
      "usuarioId": 0,
      "requisito": "El sistema permitirá depositar dinero desde un cajero automático",
      "requisitoSf": [
        {
          "id": 1,
          "requerimientoSf": "El sistema debe proporcionar una interfaz para la autenticación de usuario antes de realizar el depósito"
        },
        {
          "id": 2,
          "requerimientoSf": "El sistema debe permitir la selección de la cantidad de dinero a depositar"
        },
        {
          "id": 3,
          "requerimientoSf": "El sistema debe proporcionar una confirmación de la transacción realizada"
        }
      ]
    },
    {
      "requerimientoId": 5,
      "proyectoId": 0,
      "tipoRequerimientoId": 0,
      "usuarioId": 0,
      "requisito": "El sistema permitirá retirar dinero desde un cajero automático",
      "requisitoSf": [
        {
          "id": 4,
          "requerimientoSf": "El sistema debe proporcionar una interfaz para la autenticación de usuario antes de realizar el retiro"
        },
        {
          "id": 5,
          "requerimientoSf": "El sistema debe permitir la selección de la cantidad de dinero a retirar"
        },
        {
          "id": 6,
          "requerimientoSf": "El sistema debe proporcionar una confirmación de la transacción realizada"
        }
      ]
    }
  ];


  return (
    <List
      grid={{ gutter: 16, column: 1 }}
      dataSource={requerimiento}
      renderItem={requisito => (
        <List.Item>
          <Card title={requisito.requisito}>
            <List
              dataSource={requisito.requisitoSf}
              renderItem={requerimientoSf => (
                <List.Item>
                  {requerimientoSf.requerimientoSf}
                </List.Item>
              )}
            />
          </Card>
        </List.Item>
      )}
    />
  );
}
export default ListRequeriment;