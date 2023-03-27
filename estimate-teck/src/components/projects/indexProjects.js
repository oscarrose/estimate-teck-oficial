import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";

function indexEstimate() {

  return <div className="grid grid-rows-2 bg-white container mx-auto">
    <div className="justify-self-end row-span-2 m-2">
      <Button

        size="large"
        className="mr-10"
        type="primary"
        icon={<PlusOutlined />}

      >
        <Link to={"/register/projects"}> Nuevo proyecto</Link>

      </Button>
    </div>

  </div>;
}

export default indexEstimate;
