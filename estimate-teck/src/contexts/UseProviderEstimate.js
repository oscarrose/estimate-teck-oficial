import React, { createContext, useState, useCallback } from "react";

//create the context
const estimateContext = createContext({});

const UseProviderEstimate = ({ children }) => {

    //para manejar los requisitos de la api IA
    const [dataIaRequirement, setDataIaRequirement] = useState({}
    );

    const [prevSaveComponents, setPrevSaveComponents] = useState(null);

    const [systemCharacteristc, setSystemCharacteristic] = useState(null);

    const [saveProductivityPlatform, setSaveProductivityPlatform] = useState(null);

    const [infoProyect, setInfoProyect] = useState(null);


    const [step, setStep] = useState(1);


    const prev = useCallback(
        () => {
            setStep(step - 1);
        }, [step]
    );




    // const hola = useCallback(
    //     () => {
    //         console.log("aqui",()=>1+1)
    //     }, []
    //   );

    // console.log(hola)
    return (
        <estimateContext.Provider
            value={{
                prev, setDataIaRequirement, dataIaRequirement, step, setStep,
                prevSaveComponents, setPrevSaveComponents,
                systemCharacteristc, setSystemCharacteristic,
                setInfoProyect, infoProyect,
                saveProductivityPlatform, setSaveProductivityPlatform
            }}
        >
            {children}
        </estimateContext.Provider>
    )
}
export { UseProviderEstimate }
export default estimateContext;