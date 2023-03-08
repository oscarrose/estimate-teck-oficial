import { useState } from "react";

const useLayoutState = () => {
  const [collapsed, setCollapsed] = useState(false);
 
  return {
    collapsed,
    setCollapsed,
  };
};

export default useLayoutState;
