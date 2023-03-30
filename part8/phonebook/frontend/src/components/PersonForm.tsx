import { type FormEventHandler, useState } from "react";
import { updateCache } from "../App";
import {
  AllPersonsDocument,
  useCreatePersonMutation,
} from "../generated/graphql";

interface Props {
  setError: (arg0: string) => void;
}

const PersonForm = ({ setError }: Props): JSX.Element => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [createPerson] = useCreatePersonMutation({
    // refetchQueries: [{ query: AllPersonsDocument }],
    onError(error) {
      setError(error.graphQLErrors[0].message);
    },
    update(cache, response) {
      if (response.data?.addPerson == null) {
        return;
      }
      updateCache(
        cache,
        { query: AllPersonsDocument },
        response.data.addPerson
      );
    },
  });

  const submit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    await createPerson({
      variables: {
        name,
        phone: phone !== "" ? phone : undefined,
        street,
        city,
      },
    });
    setName("");
    setPhone("");
    setStreet("");
    setCity("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
        onSubmit={submit}
      >
        <label>
          name
          <input
            value={name}
            onChange={({ target }) => {
              setName(target.value);
            }}
          />
        </label>
        <label>
          phone
          <input
            value={phone}
            onChange={({ target }) => {
              setPhone(target.value);
            }}
          />
        </label>
        <label>
          street
          <input
            value={street}
            onChange={({ target }) => {
              setStreet(target.value);
            }}
          />
        </label>
        <label>
          city
          <input
            value={city}
            onChange={({ target }) => {
              setCity(target.value);
            }}
          />
        </label>
        <button type="submit">add!</button>
      </form>
    </div>
  );
};

export default PersonForm;
