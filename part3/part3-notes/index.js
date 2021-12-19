import express, { json } from "express";
import dotenv from "dotenv";
import Note from "./models/note.js";
import mongoose from "mongodb";

dotenv.config();

const app = express();
app.use(express.static("build"));
app.use(json());
app.use((request, _, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
});

app.post("/api/notes", async (request, response) => {
  const body = request.body;
  if (!body.content)
    return response.status(400).json({ error: "content missing" });

  const note = new Note({
    content: body.content,
    important: !!body?.important,
    date: new Date(),
  });

  try {
    const savedNote = await note.save();
    response.json(savedNote);
  } catch (error) {
    console.error("failed to save note to database: ", error);
  }
});

app.get("/", (_, response) => response.send("<h1>Hello World!</h1>"));

app.get("/api/notes", async (_, response) => {
  const notes = await Note.find();
  response.json(notes);
});

app.get("/api/notes/:id", async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id);
    note ? response.json(note) : response.status(404).end();
  } catch (error) {
    next(error);
  }
});

app.put("/api/notes/:id", async (request, response, next) => {
  const { content, important } = request.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      request.params.id,
      { content, important },
      { new: true }
    );
    response.json(updatedNote);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/notes/:id", async (request, response, next) => {
  try {
    await Note.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

const unknownEndpoint = (_, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (error, _, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
