const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));
morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

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
  return Math.random()
    .toString(36)
    .substring(2, 20 + 2);
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
