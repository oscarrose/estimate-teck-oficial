import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-hYAqw3wt9Nq50f92z8EdE1Zl",
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


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
    const Response = responseIA.data.choices[0].text;
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