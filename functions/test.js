exports.handler = async function (event, context) {
	const { identity, user } = context.clientContext;
	// Do stuff and return a response...

	return {
		statusCode: 200,
		headers,
		body: JSON.stringify({
			test: 'hello world'
		})
	};
};
