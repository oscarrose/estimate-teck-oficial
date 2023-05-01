import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-eBtCx77zqaGE9sFcAJR3zLSi",
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

function removeLetterRespuesta(cadena) {
    const indice = cadena.indexOf('[');
    if (indice !== -1) {
        return cadena.substring(indice);
    }
    return cadena;
}
// if (cadena.includes("Respuesta:")) {
//     return cadena.replace("Respuesta:", "");
// } else {
//     return cadena;
// }

const completionIA = async ({ prompt }) => {
    const responseIA = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        //top_p:1,
        top_p: 1.0,
        max_tokens: 2048
    });
    const Response = removeLetterRespuesta(responseIA.data.choices[0].text);
    console.log(Response)
    return Response

};

const fetchTest = async () => {
    if (true) {
        return await {
            data: "Exito",
            message: "paso prueba",
            statusCode: 201
        };
    }
}

export { fetchTest, completionIA }