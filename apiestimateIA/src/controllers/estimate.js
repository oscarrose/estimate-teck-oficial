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
    const newPrompt = `escribeme los requisitos funcionales de software especificos, de no existir ignoralo,de estos los siguientes requerimientos de usuarios:\n ${JSON.stringify(prompt)} \ndevolver la respuesta separada por coma, en el siguiente formato JSON: [{"id":N,"requisito":"El requerimiento de usuario","requisitoSf":[respuesta de los requerisitos funcionales de software],}]`;
    console.log(newPrompt)
  
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