import { useEffect, useState } from "react";
import FormInput from "./components/FormInput";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Message from "./components/Message";
import personsService from "./services/persons";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

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

  const showMessage = (message, error = false) => {
    setIsError(error);
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleError = (error, person) => {
    if (error.request.status === 404 || error.response.status === 404) {
      showMessage(
        `The person "${person.name}" was not found, or has already been deleted from the server`,
        true
      );
      return setPersons((prev) => prev.filter((p) => p._id !== person._id));
    }
    showMessage(error.response?.data?.error ?? error.message, true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const existingPerson = persons.find((person) => person.name === newName);
    if (existingPerson && existingPerson.number === newNumber)
      return showMessage(`${newName} is already added to phonebook`, true);
    if (
      existingPerson &&
      existingPerson.number !== newNumber &&
      window.confirm(
        `${existingPerson.name} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      try {
        const updatedPerson = await personsService.update({
          ...existingPerson,
          number: newNumber,
        });
        setPersons((prev) =>
          prev.map((person) =>
            person._id === updatedPerson._id ? updatedPerson : person
          )
        );
        return showMessage(`Updated ${updatedPerson.name}`);
      } catch (error) {
        handleError(error, existingPerson);
      }
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    };
    try {
      const createdPerson = await personsService.create(newPerson);
      setPersons((prev) => prev.concat(createdPerson));
      showMessage(`Added ${createdPerson.name}`);
      setNewName("");
      setNewNumber("");
    } catch (error) {
      handleError(error, newPerson);
    }
  };

  const deletePerson = async (person) => {
    if (window.confirm(`Delete ${person.name}?`))
      try {
        await personsService.deletePerson(person._id);
        setPersons((prev) => prev.filter((p) => p._id !== person._id));
        showMessage(`Deleted ${person.name}`);
      } catch (error) {
        handleError(error, person);
      }
  };

  return (
    <div className="app">
      <h2>Phonebook</h2>
      <Message className="message" message={message} isError={isError} />
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
