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

export { testIa, generationSoftwareRequirements }