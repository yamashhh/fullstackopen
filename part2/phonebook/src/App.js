import { useEffect, useState } from "react";
import FormInput from "./components/FormInput";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:3001/persons");
      setPersons(data);
    };
    fetchData();
  }, []);

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
