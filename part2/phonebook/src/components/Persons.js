const Persons = ({ persons }) => (
  <ul style={{ listStyle: "none", padding: 0 }}>
    {persons.map((person) => (
      <li key={person.id}>
        {person.name} {person.number}
      </li>
    ))}
  </ul>
);

export default Persons;
