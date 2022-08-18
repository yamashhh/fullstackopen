import { useEffect } from "react";
import useField from "../hooks/useField";
import useResource from "../hooks/useResource";

const Persons = () => {
  const name = useField("text");
  const number = useField("text");
  const [persons, personService] = useResource("http://localhost:3005/persons");

  useEffect(
    () => {
      (async () => {
        await personService.getAll();
      })();
    },
    // NOTE:
    // only run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value });
  };

  return (
    <>
      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </>
  );
};

export default Persons;
