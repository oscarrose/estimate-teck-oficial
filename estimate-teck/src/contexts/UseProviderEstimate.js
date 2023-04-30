import React, { createContext, useState, useCallback } from "react";
import CallApi from "../ServicesHttp/CallApi";
import { message, notification } from "antd"
//create the context
const estimateContext = createContext({});

const UseProviderEstimate = ({ children }) => {

    //para manejar los requisitos de la api IA
    const [dataIaRequirement, setDataIaRequirement] = useState({}
    );

    //para manejar clasifican de los components
    const [saveClassificationComponents, setSaveClassificationComponents] = useState(null);

    //para manejar las caracteristica de los componentes
    const [systemCharacteristc, setSystemCharacteristic] = useState(null);

    //para manejar la produtividad para la estimacion
    const [saveProductivityPlatform, setSaveProductivityPlatform] = useState(null);

    //Para manejar la informacion del proyecto
    const [infoProyect, setInfoProyect] = useState(null);

    const [finishEstimate, setFinishEstimate] = useState(false)


    const [step, setStep] = useState(0);

    const openNotificationWithIcon = (type, position, title, message) => {
        notification[type]({
            message: title,
            description: message,
            placement: position,
        });
    };



    const finishProjectEstimate = async () => {
        const newClassificationComponents = saveClassificationComponents.flatMap(({ requisitoSf }) => requisitoSf.map(({ id, tipoComponenteId, complejidad, usuarioId, proyectoId }) => ({
            RequerimientoSwId: id, tipoComponenteId, complejidad, usuarioId, proyectoId
        })));
        const newProductividadId = saveProductivityPlatform.map((item) => ({  ProductividadId: item }));
       

        const dataToSend = {
            ComponenteFuncionales: newClassificationComponents,
            CaracteristicaSistemas: systemCharacteristc,
            Productividades: newProductividadId,
        };
      
        await CallApi.post("Estimacions/estimarProyectos ", dataToSend)
            .then((res) => {
                console.log("res!", res.data)
            }).catch((error) => {
                message.error(error)
            });

    }



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
                finishEstimate, setFinishEstimate,
                finishProjectEstimate, prev, setDataIaRequirement, dataIaRequirement, step, setStep,
                saveClassificationComponents, setSaveClassificationComponents,
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