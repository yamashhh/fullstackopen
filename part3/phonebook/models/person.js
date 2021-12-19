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
  process.exit(5);
}

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
});
const Person = mongoose.model("Person", personSchema);

export default Person;
