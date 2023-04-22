import React, { createContext, useState } from "react";

//create the context
const estimateContext = createContext({});

const UseProviderEstimate = ({ children }) => {

    //para manejar los requisitos de la api IA
    const [dataIaRequirement, setDataIaRequirement] = useState({}
    );

    const [prevSaveComponents, setPrevSaveComponents] = useState(null)

    const [step, setStep] = useState(1);
    return (
        <estimateContext.Provider
            value={{
                setDataIaRequirement, dataIaRequirement, step, setStep,
                prevSaveComponents, setPrevSaveComponents
            }}
        >
            {children}
        </estimateContext.Provider>
    )
}
export { UseProviderEstimate }
export default estimateContext;