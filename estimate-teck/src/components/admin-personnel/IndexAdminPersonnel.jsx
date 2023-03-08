import React, { useState } from "react";
import { Card } from "antd";
import ModuleEmployee from "./ModuleEmployee"
import ModuleUser from "./ModuleUser";

function IndexAdminPersonnel() {
  const [activeTabKey, setActiveTabKey] = useState("employee");

  const tabListNoTitle = [
    {
      key: "employee",
      tab: "Empleados",
    },
    {
      key: "user",
      tab: "Usuarios",
    },
  ];
  const contentListNoTitle = {
    employee: <ModuleEmployee  />,
    user: <ModuleUser />,
  };

  const onTabChange = (key) => {
    setActiveTabKey(key);
  };

  return (
    <div className="m-5">
      <Card
        style={{
          width: "100%",
        }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey}
        onTabChange={(key) => {
          onTabChange(key);
        }}
      >
        {contentListNoTitle[activeTabKey]}
      </Card>
    </div>
  );
}

export default IndexAdminPersonnel;
