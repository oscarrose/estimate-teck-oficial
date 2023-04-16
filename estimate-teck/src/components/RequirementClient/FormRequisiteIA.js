import React, { useState } from "react";
import { Form, Input, Button, Typography, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined,DeleteOutlined } from '@ant-design/icons';
const { Title } = Typography;
function FormReqisiteIA() {

  const [data, setData] = useState([
    {
      req: "el sistema retirara",
      id: 1,
      softR: [
        {
          rs: "ingresar pass",
          id: 1
        },
        {
          rs: "ingresar email",
          id: 2
        }
      ]
    }
  ]);


  // Función para agregar un nuevo elemento completo a la lista
  const handleAdd = () => {
    setData([...data, { req: "", softR: [{ rs: "" }] }]);
  };

  // Función para eliminar un elemento completo de la lista
  const handleRemove = (index) => {
    const list = [...data];
    list.splice(index, 1);
    setData(list);
  };

  // Función para agregar un nuevo item a la lista de softR de un elemento
  const handleAddSoftR = (index) => {
    const list = [...data];
    list[index].softR.push({ rs: "" });
    setData(list);
  };

  // Función para eliminar un item de la lista de softR de un elemento
  const handleRemoveSoftR = (index, subIndex) => {
    const list = [...data];
    list[index].softR.splice(subIndex, 1);
    setData(list);
  };

  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  return (
    <div className="bg-white shadow-sm px-8 pt-6 pb-8 mb-4 w-full max-w-7xl">
      <Title le level={3}>Creador de requerimientos de software</Title>
    
      <Form onFinish={onFinish}>

        {data.map((item, index) => (
          <div key={index}>
            <Form.Item

              label="Requerimiento"
              name={["req", index]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "El requerimiento es requerido",
                },
              ]}
              initialValue={item.req}
            >
              <Input />
            </Form.Item>
            {item.softR.map((subItem, subIndex) => (
              <Space align="baseline"
                style={{
                  display: 'flex',
                }}>
                <Form.Item
                  key={subIndex}
                  label="Requisito de software"
                  name={["softR", index, "rs", subIndex]}
                  hasFeedback
                  initialValue={subItem.rs}
                >
                  <Input />
                </Form.Item>
                {item.softR.length >1 &&(<MinusCircleOutlined className="dynamic-delete-button"
                  onClick={() => handleRemoveSoftR(index, item.softR.length - 1)}
                />)}
              </Space >


            ))}
            <Space>
            <Button type="primary" ghost onClick={() => handleAddSoftR(index)}>
              <PlusOutlined /> Agregar requisito de software
            </Button>

            {data.length > 1 && (
              <Button type="default" danger onClick={() => handleRemove(index)}> <DeleteOutlined />Eliminar requerimiento</Button>
            )}
            </Space>
            <hr className="divide-y divide-dashed"/>
          </div>
        ))}
        <Space style={{
          display: 'flex',
          justifyContent:"end"
        }}>
          <button class="bg-black border-none shadow-sm hover:bg-slate-700 text-white font-sans py-1.5 px-2.5  rounded inline-flex items-center" onClick={handleAdd}>
            Agregar requerimiento
          </button>
          <Button htmlType="submit" type="primary"  style={{ marginLeft: "10px" }}>
            Guardar requerimientos
          </Button>
        </Space>
      </Form>
    </div>
  );
}

export default FormReqisiteIA;
