import { useState } from "react";
import {
  AllPersonsQuery,
  useFindPersonByNameQuery,
} from "../generated/graphql";
import Person from "./Person";

interface Props {
  persons: AllPersonsQuery["allPersons"];
}

const Persons = ({ persons }: Props): JSX.Element => {
  const [nameToSearch, setNameToSearch] = useState("");
  const { data } = useFindPersonByNameQuery({
    variables: { nameToSearch },
    skip: nameToSearch === "",
  });

  if (nameToSearch !== "" && data?.findPerson != null) {
    return (
      <Person person={data.findPerson} onClose={() => setNameToSearch("")} />
    );
  }

  return (
    <div>
      <h2>Persons</h2>
      {persons.map((p) => (
        <div key={p.id}>
          {p.name} {p.phone}
          <button onClick={() => setNameToSearch(p.name)}>show address</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
