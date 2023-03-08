import React from "react";

import LayoutApp from "./components/Layout/LayoutApp";
function AppRouter({ component: Component }) {
  return (
    <LayoutApp>
      <Component  />
    </LayoutApp>
  );
}

export default AppRouter;
