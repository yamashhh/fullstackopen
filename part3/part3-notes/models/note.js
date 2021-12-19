import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.MONGODB_URI;
console.log("connecting to", url);

try {
  await mongoose.connect(url);
  console.log("connected to MongoDB");
} catch (error) {
  console.error("error connecting to MongoDB: ", error);
}

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});
const Note = mongoose.model("Note", noteSchema);

export default Note;
