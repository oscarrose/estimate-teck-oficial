import React, { createContext, useState } from "react";

//create the context
const estimateContext = createContext({});

const UseProviderEstimate = ({ children }) => {

    //para manejar los requisitos de la api IA
    const [dataIaRequirement, setDataIaRequirement] = useState({ }
    );

    return (
        <estimateContext.Provider
            value={{ setDataIaRequirement, dataIaRequirement }}
        >
            {children}
        </estimateContext.Provider>
    )
}
export { UseProviderEstimate }
export default estimateContext;