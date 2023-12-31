const unknownEndpoint = (request, response) => {
	response.status(400).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	}
	if (error.name === 'ValidationError') {
		return response.status(400).send({ error: error.message });
	}

	next(error);
};

module.exports = {
	unknownEndpoint,
	errorHandler,
};
