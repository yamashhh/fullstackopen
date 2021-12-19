import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import Note from "./models/note.js";
import mongoose from "mongodb";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use((request, _, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
});
app.use(express.static("build"));

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

app.get("/api/notes/:id", async (request, response) => {
  if (!mongoose.ObjectId.isValid(request.params.id))
    return response.status(422).end();
  const note = await Note.findById(request.params.id);
  note ? response.json(note) : response.status(404).end();
});

app.delete("/api/notes/:id", async (request, response) => {
  if (!mongoose.ObjectId.isValid(request.params.id))
    return response.status(422).end();
  const note = Note.findById(request.params.id);
  if (note) {
    try {
      await note.deleteOne();
      response.status(204).end();
      return;
    } catch (error) {
      console.error("failed to delete note from database: ", error);
    }
  }
  response.status(404).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
