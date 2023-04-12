import { Link } from "react-router-dom";
import { SolutionOutlined, EditOutlined,DollarOutlined } from "@ant-design/icons";
import { Space, Table, Tag } from 'antd';
let rute = process.env.REACT_APP_RUTE_VM



const TableProject = ({ dataTableProject, setEditProject }) => {
  const columns = [

    {
      title: 'Id proyecto',
      dataIndex: 'proyectoId',
      key: 'proyectoId',
    },
    {
      title: 'Cliente',
      dataIndex: 'cliente',
      key: 'cliente',
      render: (text) => <a>{text.nombreCliente}</a>,
    },

    {
      title: 'Nombre proyecto',
      dataIndex: 'nombreProyecto',
      key: 'nombreProyecto',
    },
    {
      title: 'Estado',
      key: 'estadoProyecto',
      dataIndex: 'estadoProyecto',
      render: (text) => <Tag color={"geekblue"} >{text.nombreEstadoProyecto}</Tag>,
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      key: 'descripcion',
    },
    {
      title: 'Creado por',
      dataIndex: 'usuario',
      key: 'usuario',
      render: (text) => <span>{`${text.empleado.nombre} ${text.empleado.apellido}  `}</span>,
    },
    {
      title: 'Fecha creación',
      dataIndex: 'fechaCreacion',
      key: 'fechaCreacion',
    },
    {
      key: 'action',
      render: (_, record) => (
        <Space size="middle" direction="vertical">

          <Link to={`${rute}edit/projects/${record.proyectoId}`}
           
          >
            <EditOutlined />Editar
          </Link>

          <Link to={`${rute}project/requirementClient/${record.proyectoId}`}
            style={{ marginBottom: "1rem" }} >
            <SolutionOutlined />Administrar Requerimientos
          </Link>

          <Link to={`${rute}project/estimate/${record.proyectoId}`}
            style={{ marginBottom: "1rem" }} >
           <DollarOutlined />Administrar 
            estimación
          </Link>

        </Space>
      ),
    },
  ];



  return (
    <Table columns={columns} dataSource={dataTableProject} />
  );
}
export default TableProject;