import { handleSuccess, handleError } from "../utils/handleResponse.js";
import { fetchTest, completionIA } from "../services.js";


const testIa = async (req, res) => {

    try {
        const response = await fetchTest();
        handleSuccess({ req: req, res: res, dataResponse: response.data, message: response.message, status: response.statusCode })
    } catch (error) {
        handleError({ res: res, errorMessage: "Unexpected Error", status: 500, detailsError: error })
    }
}

const generationSoftwareRequirements = async (req, res) => {

    const { prompt } = req.body;

    const newPrompt = `escribeme los requisitos funcionales de software especificos, de no existir ignoralo,de estos los siguientes requerimientos de usuarios:\n ${JSON.stringify(prompt)} \ndevolver la respuesta separada por coma, en el siguiente formato JSON:[{"id":X,"tipoRequerimientoId":tipoRequerimientoId,"requisito":"El requerimiento de usuario","requisitoSf":[{"id":X,"requerimientoSf":"requerisito funcional de software"},],}]`;

    try {
        const dataIA = await completionIA({ prompt: newPrompt });
        handleSuccess({ req: req, res: res, dataResponse: dataIA })

    } catch (error) {
        handleError({
            res: res, errorMessage: "unexpected error",
            status: 500, detailsError: error
        })
    }

}

const classifictionRequirementsSoftware = async (req, res) => {
    // const { req } = req.body;

    let newPrompt = `Simula que eres un experto en estimacion de software por punto de funcion y Clasifica en componente de 1:Entradas Externas, 2:Salidas Externas, 3:Consultas Externas, 4:Archivos Lógicos Internos, 5:Interfaces Externas. Asignale una de las siguiente complejidad: baja, media, alta.A los siguientes requerimientos:\n ${JSON.stringify(req.body)} \ndevolver la respuesta separada por coma, en el siguiente formato JSON:\n[{"id":id, "tipoComponenteId":"clasificacionId","clasificacion":"clasificacion","complejidad":"complejidad"},]`;
    try {
        const dataIA = await completionIA({ prompt: newPrompt });
        handleSuccess({ req: req, res: res, dataResponse: dataIA })

    } catch (error) {
        handleError({
            res: res, errorMessage: "unexpected error",
            status: 500, detailsError: error
        })
    }
}


const evaluateFeatureSystem = async (req, res) => {

    // console.log(req.body)

    let newPrompt = `Simula que eres un experto en estimacion de software por punto de funcion y evalua un tipo ${JSON.stringify(req.body.tipoSistema)} .Ponle una valoracion a cada caractetistica de acuerdo a esta estructura, del siguiente objecto toma la propiedad significado para la valoracion [{"idPuntaje": 1,"valor": 0,"significado": "Sin influencia"},{"idPuntaje": 2, "valor": 1,"significado": "Incidental"},{"idPuntaje": 3,"valor": 2,"significado": "Moderado"},{"idPuntaje": 4,"valor": 3,
    "significado": "Medio"},{"idPuntaje": 5,"valor": 4,"significado": "Significativo"},{"idPuntaje": 6,"valor": 5, "significado": "Esencial"}] \n Listados de caracteristicas :\n
    Comunicación de datos \n
    Procesamiento de datos distribuido\n
    Rendimiento\n
    Uso del hardware existente\n
    Transacciones\n
    Entrada de datos interactiva\n
    Eficiencia\n
    Actualizaciones on-line\n
    Complejidad de procesamiento\n
    Reusabilidad\n
    Facilidad de conversión e instalación\n
    Facilidad de operación\n
    Múltiples instalaciones\n
    Facilidad de mantenimiento\n
    Devolver la respuesta separada por coma, en el siguiente formato JSON:[{"caracteristica":caracteristica,"Idpuntaje":Idpuntaje, "significado":significado},]
`;

    try {
        const dataIA = await completionIA({ prompt: newPrompt });
        handleSuccess({ req: req, res: res, dataResponse: dataIA })

    } catch (error) {
        handleError({
            res: res, errorMessage: "unexpected error",
            status: 500, detailsError: error
        })
    }
}

export { testIa, generationSoftwareRequirements, classifictionRequirementsSoftware, evaluateFeatureSystem }