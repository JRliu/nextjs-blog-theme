const Openai = require('openai')

require("dotenv").config();

exports.handler = async function (event, context) {
	const { identity, user } = context.clientContext;
	// Do stuff and return a response...

	const configuration = new Openai.Configuration({
		apiKey: process.env.OPENAI_API_KEY,
	});
	const openai = new Openai.OpenAIApi(configuration);

	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: event.query.ask,
		temperature: 0.7,
		max_tokens: 256,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
	});

	return {
		statusCode: 200,
		identity, 
		user,
		body: response.data.choices[0].text
	};
};
