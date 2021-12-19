import express, { json } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import Person from "./models/person.js";

dotenv.config();
const PORT = process.env.PORT || 3001;

const app = express();
app.use(json());
app.use(express.static("build"));

morgan.token("request-body", (request) => JSON.stringify(request.body));
app.use(morgan("tiny", { skip: (request) => request.method === "POST" }));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :request-body",
    {
      skip: (request) => request.method !== "POST",
    }
  )
);

app.post("/api/persons", async (request, response) => {
  const { name, number } = request.body;
  if (!name || !number)
    return response.status(422).json({ error: "name or number is missing" });
  // if (!persons.every((person) => person.name !== body.name))
  //   return response.status(400).json({ error: "name must be unique" });
  const person = new Person({ name, number });

  try {
    const savedPerson = await person.save();
    return response.json(savedPerson);
  } catch (error) {
    response.status(502).json({ error });
  }
});

app.get("/api/persons", async (_, response) => {
  const persons = await Person.find();
  response.json(persons);
});

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
