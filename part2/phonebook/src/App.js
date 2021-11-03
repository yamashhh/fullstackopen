import { useEffect, useState } from "react";
import FormInput from "./components/FormInput";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setPersons(await personsService.getAll());
    };
    fetchData();
  }, []);

  const personsToShow = filteredPersons.length ? filteredPersons : persons;

  useEffect(
    () =>
      setFilteredPersons(
        persons.filter(
          (person) => person.name.toLowerCase() === filter.toLowerCase()
        )
      ),
    [persons, filter]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson && existingPerson.number === newNumber)
      return alert(`${newName} is already added to phonebook`);
    if (
      existingPerson &&
      existingPerson.number !== newNumber &&
      window.confirm(
        `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      const returnedPerson = await personsService.update({
        ...existingPerson,
        number: newNumber,
      });
      return setPersons((prev) =>
        prev.map((person) =>
          person.id === returnedPerson.id ? returnedPerson : person
        )
      );
    }

    const newPerson = await personsService.create({
      name: newName,
      number: newNumber,
    });
    setPersons((prev) => prev.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  const deletePerson = async (person) => {
    if (window.confirm(`Delete ${person.name}?`))
      try {
        await personsService.deletePerson(person.id);
        setPersons((prev) => prev.filter((p) => p.id !== person.id));
      } catch (error) {
        if (error.request.status === 404 || error.response.status === 404) {
          alert(
            `The person "${person.name}" was not found, or has already been deleted from the server.`
          );
          return setPersons((prev) =>
            prev.filter((person) => person.id !== person)
          );
        }
        console.error({ ...error });
      }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <FormInput
        label="filter shown with"
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
      <h3>add a new</h3>
      <PersonForm
        onSubmit={handleSubmit}
        name={newName}
        onNameChange={(event) => setNewName(event.target.value)}
        number={newNumber}
        onNumberChange={(event) => setNewNumber(event.target.value)}
      />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
