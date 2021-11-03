const Persons = ({ persons, deletePerson }) => {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {persons.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

export default Persons;
