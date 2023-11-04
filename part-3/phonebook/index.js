//add dotenv for enviroment variables
require("dotenv").config();

//import necesary for backend without db
const express = require("express");
const cors = require("cors");

//import model
const Person = require("./models/person");
//create app with express
const app = express();

//middleware for deploy and have the frontend prod in the same path
app.use(express.static("dist"));

//middleware json and cors for backend
app.use(express.json());
app.use(cors());

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

//get all exercise 3.1
app.get("/api/persons", (request, response) => {
  Person.find({}).then((result) => {
    response.json(result);
  });
});

//show info exercise 3.2
app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${Date()}</p>`
  );
});

//get by id exercise 3.3
app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

//delete by id exercise 3.4
app.delete("/api/persons/:id", (request, response) => {
});

//create new person exercise 3.5 3.6
app.post("/api/persons", (request, response) => {
  const { body } = request;
  // const isName = persons.find((person) => person.name === body.name);

  //validation
  if (!body.name && !body.number)
    return response.status(400).json({ error: "name and number missing" });

  if (!body.name) return response.status(400).json({ error: "name missing" });

  if (!body.number)
    return response.status(400).json({ error: "number missing" });

  // if (isName)
  //   return response.status(400).json({ error: "name must be unique" });
  //

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then(result => {
    response.json(person);
  });
});

//port to be use with env variable
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
