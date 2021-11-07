import express, { json } from "express";
import morgan from "morgan";
const PORT = 3001;

morgan.token("request-body", (request) => JSON.stringify(request.body));

const app = express();
app.use(json());
app.use(morgan("tiny", { skip: (request) => request.method === "POST" }));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :request-body",
    {
      skip: (request) => request.method !== "POST",
    }
  )
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

const generateRandomId = () => Math.floor(Math.random() * 1_000_000_000);

app.post("/api/persons", (request, response) => {
  const { body } = request;
  if (!body.name || !body.number)
    return response.status(400).json({ error: "name or number is missing" });
  if (!persons.every((person) => person.name !== body.name))
    return response.status(400).json({ error: "name must be unique" });
  const person = {
    id: generateRandomId(),
    name: body.name,
    number: body.number,
  };
  persons = persons.concat(person);
  response.json(person);
});

app.get("/api/persons", (_, response) => response.json(persons));

app.get("/api/persons/:id", (request, response) => {
  const person = persons.find(
    (person) => person.id === Number(request.params.id)
  );
  if (person) return response.json(person);
  response.status(404).end();
});

app.delete("/api/persons/:id", (request, response) => {
  persons = persons.filter((person) => person.id !== Number(request.params.id));
  response.status(204).end();
});

app.get("/info", (_, response) =>
  response.send(`
<p>Phonebook has info for ${persons.length} people</p>
<p>${new Date().toString()}</p>
`)
);

app.use((_, response) =>
  response.status(404).send({ error: "unknown endpoint" })
);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
