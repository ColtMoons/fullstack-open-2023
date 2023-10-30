//import necesary for backend without db
const express = require("express");
const cors = require("cors");

//create app with express
const app = express();

//middleware json and cors for backend
app.use(express.json());
app.use(cors());

//middleware for deploy and have the frontend prod in the same path
app.use(express.static("dist"));

//logs middleware
const morgan = require("morgan");
//create a morgan log token
morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});
//logs middleware with morgan 
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

//list of persons
let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  return Math.random() * 99999999;
};

//get all exercise 3.1
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

//show info exercise 3.2
app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${Date()}</p>`
  );
});

//get by id exercise 3.3
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (!person)
    return response.status(404).json({ error: "person do not exist" });

  response.json(person);
});

//delete by id exercise 3.4
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

//create new person exercise 3.5 3.6
app.post("/api/persons", (request, response) => {
  const { body } = request;
  const isName = persons.find((person) => person.name === body.name);

  //validation
  if (!body.name && !body.number)
    return response.status(400).json({ error: "name and number missing" });

  if (!body.name) return response.status(400).json({ error: "name missing" });

  if (!body.number)
    return response.status(400).json({ error: "number missing" });

  if (isName)
    return response.status(400).json({ error: "name must be unique" });
  //

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  response.json(person);
});

//port to be use with env variable
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
