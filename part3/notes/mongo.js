import mongoose from "mongoose";

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstackopen:${password}@fullstackopen.xmrnq.mongodb.net/note-app?retryWrites=true&w=majority`;

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "[Instrumental Bridge]",
  date: new Date(),
  important: true,
});

try {
  await note.save();
  console.log("note saved!");
} catch {
  console.error("failed to save note lol");
}

try {
  const result = await Note.find({ important: true });
  result.forEach((note) => console.log(note));
} catch {
  console.error("failed to find notes lmao");
} finally {
  mongoose.connection.close();
}
