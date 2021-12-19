import mongoose from "mongoose";

const [, , password, name, phoneNumber] = process.argv;

if (!password) {
  console.error("Usage: node mongo.js <password> <name?> <phone number?>");
  process.exit(9);
}

const url = `mongodb+srv://fullstackopen:${password}@fullstackopen.xmrnq.mongodb.net/phonebook?retryWrites=true&w=majority`;
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  date: Date,
});
const Person = mongoose.model("Person", personSchema);

if (name && phoneNumber) {
  const person = new Person({
    name,
    phoneNumber,
    date: new Date(),
  });

  try {
    await person.save();
    console.log(`added ${name} number ${phoneNumber} to phonebook`);
  } catch {
    console.error("something went wrong while adding person to phonebook");
  }
} else {
  let result;

  try {
    result = await Person.find({});
  } catch {
    console.error("something went wrong while finding people from phonebook");
  }

  if (result.length) {
    console.log("phonebook:");
    result.forEach((person) =>
      console.log(`${person.name} ${person.phoneNumber}`)
    );
  } else {
    console.log("no one is added to phonebook");
  }
}

mongoose.connection.close();
