import { useState } from "react";
import FormInput from "./components/FormInput";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const personsToShow = filteredPersons.length ? filteredPersons : persons;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!persons.every((person) => person.name !== newName))
      return alert(`${newName} is already added to phonebook`);

    setPersons((prev) =>
      prev.concat({ name: newName, number: newNumber, id: prev.length + 1 })
    );
    setNewName("");
    setNewNumber("");
  };

  const handleFilter = (event) =>
    setFilteredPersons(
      persons.filter(
        (person) =>
          person.name.toLowerCase() === event.target.value.toLowerCase()
      )
    );

  return (
    <div>
      <h2>Phonebook</h2>
      <FormInput label="filter shown with" onChange={handleFilter} />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={handleSubmit}
        name={newName}
        onNameChange={(event) => setNewName(event.target.value)}
        number={newNumber}
        onNumberChange={(event) => setNewNumber(event.target.value)}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
