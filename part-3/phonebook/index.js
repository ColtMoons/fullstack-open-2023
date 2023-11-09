//add dotenv for enviroment variables
require('dotenv').config();

//import necesary for backend without db
const express = require('express');
const cors = require('cors');

//import model
const Person = require('./models/person');
//create app with express
const app = express();

//middleware for deploy and have the frontend prod in the same path
app.use(express.static('dist'));

//middleware json and cors for backend
app.use(express.json());
app.use(cors());

//logs middleware
const morgan = require('morgan');
//create a morgan log token
morgan.token('body', (req) => {
	return JSON.stringify(req.body);
});
//logs middleware with morgan
app.use(
	morgan(':method :url :status :res[content-length] - :response-time ms :body')
);

//get all exercise 3.1
app.get('/api/persons', (request, response) => {
	Person.find({})
		.then((result) => {
			response.json(result);
		})
		.catch(() => {
			response.status(500).send({ error: 'bad request' });
		});
});

//show info exercise 3.2
app.get('/info', (request, response) => {
	Person.find({}).then((result) => {
		response.send(
			`<p>Phonebook has info for ${result.length} people</p><p>${Date()}</p>`
		);
	});
});

//get by id exercise 3.3
app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then((person) => {
			if (!person) {
				return response.status(404).end();
			}
			response.json(person);
		})
		.catch((error) => next(error));
});

//delete by id exercise 3.4
app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then(() => {
			response.status(204).end();
		})
		.catch((error) => next(error));
});

//create new person exercise 3.5 3.6
app.post('/api/persons', (request, response, next) => {
	const { body } = request;
	// const isName = persons.find((person) => person.name === body.name);

	//validation
	if (!body.name && !body.number)
		return response.status(400).json({ error: 'name and number missing' });

	if (!body.name) return response.status(400).json({ error: 'name missing' });

	if (!body.number)
		return response.status(400).json({ error: 'number missing' });

	// if (isName)
	//   return response.status(400).json({ error: "name must be unique" });
	//

	const person = new Person({
		name: body.name,
		number: body.number,
	});

	person
		.save()
		.then(() => {
			response.json(person);
		})
		.catch((error) => next(error));
});

app.put('/api/persons/:id', (request, response, next) => {
	const { name, number } = request.body;
	const person = { name, number };

	Person.findByIdAndUpdate(request.params.id, person, {
		new: true,
		runValidators: true,
		context: 'query',
	})
		.then((updatedNote) => {
			response.json(updatedNote);
		})
		.catch((error) => next(error));
});

//error middleware just check for cast error
const errorHandler = (error, request, response, next) => {
	console.log(error);
	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	}

	if (error.name === 'ValidationError') {
		return response.status(400).send({ error: error.message });
	}

	next(error);
};

app.use(errorHandler);

//port to be use with env variable
const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
