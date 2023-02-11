import { Configuration, OpenAIApi } from "openai"


const fn = async (req, res) => {
	const configuration = new Configuration({
		apiKey: process.env.OPENAI_API_KEY,
	});

	const { ask } = req.query

	const openai = new OpenAIApi(configuration);

	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: ask,
		temperature: 0.7,
		max_tokens: 256,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
	});
	// res.status(200).end(JSON.stringify(response))
	console.log('===response', response.data);
	res.status(200).json(response.data.choices[0].text)
}

export default fn

// export const config = {
// 	type: 'experimental-background',
// }