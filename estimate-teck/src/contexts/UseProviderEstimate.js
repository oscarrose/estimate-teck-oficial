import React, { createContext, useState } from "react";

//create the context
const estimateContext = createContext({});

const UseProviderEstimate=({children})=>{
    const [dataIaRequirement, setDataIaRequirement]=useState(null);

    return (
        <estimateContext.Provider
        value={{setDataIaRequirement, dataIaRequirement}}
        >
            {children}
        </estimateContext.Provider>
    )
}
export {UseProviderEstimate}
export default estimateContext;