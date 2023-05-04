import React, { createContext, useState, useCallback } from "react";
import CallApi from "../ServicesHttp/CallApi";
import { message, notification } from "antd"
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
//create the context
const estimateContext = createContext({});

let rute = process.env.REACT_APP_RUTE_VM

const UseProviderEstimate = ({ children }) => {

    const navigate = useNavigate();

    const { auth } = useAuth();

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

    const [detalleEstimacion, setDetalleEstimacion] = useState(null)

    const [updateDetalleEstimacion, setUpdateDetalleEstimacion] = useState(false);

    const [loadingDetalleEstimacion, setLoadingDetalleEstimacion] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isModalParametro, setIsModalParametro] = useState(false);

    //Para saber cuando se estan obteniendo los datos
    const [loadingEstimacion, setLoandingEstimacion] = useState(false);

    const openNotificationWithIcon = (type, position, title, message) => {
        notification[type]({
            message: title,
            description: message,
            placement: position,
        });
    };

    const finishProjectEstimate = async () => {
        setFinishEstimate(true)
        const newClassificationComponents = saveClassificationComponents.flatMap(({ requisitoSf }) => requisitoSf.map(({ id, tipoComponenteId, complejidad, usuarioId, proyectoId }) => ({
            RequerimientoSwId: id, tipoComponenteId, complejidad, usuarioId, proyectoId
        })));
        const newProductividadId = saveProductivityPlatform.map((item) => ({ ProductividadId: item }));


        const dataToSend = {
            ComponenteFuncionales: newClassificationComponents,
            CaracteristicaSistemas: systemCharacteristc,
            Productividades: newProductividadId,
            usuarioId: auth.idUsuario
        };

        await CallApi.post("Estimacions/estimarProyectos ", dataToSend)
            .then((res) => {
                console.log("res", res.data)
                setFinishEstimate(false)
                openNotificationWithIcon('success', 'topRight', 'Estimaddor de proyectos', 'Estimación realizada correctamente')
                navigate(rute + `project/estimate/${infoProyect.proyectoId}`, { replace: true });
            }).catch((error) => {
                openNotificationWithIcon('error', 'topRight', 'Estimaddor de proyectos', error)
                setFinishEstimate(false)
            });

    }


    //   useEffect(() => {
    //     fetchDataDetalleEstimacion();

    //   }, []);


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

    return (
        <estimateContext.Provider
            value={{
                isModalParametro, setIsModalParametro,loadingEstimacion, setLoandingEstimacion, isModalOpen, setIsModalOpen, loadingDetalleEstimacion, setLoadingDetalleEstimacion, updateDetalleEstimacion, setUpdateDetalleEstimacion, detalleEstimacion, setDetalleEstimacion, finishEstimate, setFinishEstimate,
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