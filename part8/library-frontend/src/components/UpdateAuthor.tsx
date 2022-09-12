import { FormEventHandler, useState } from "react";
import {
  AllAuthorsDocument,
  useEditAuthorMutation,
} from "../generated/graphql";

const UpdateAuthor = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState<number | undefined>();
  const [editAuthor] = useEditAuthorMutation({
    refetchQueries: [{ query: AllAuthorsDocument }],
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!(name && born)) {
      return;
    }

    await editAuthor({ variables: { name, setBornTo: born } });
    setName("");
    setBorn(undefined);
  };

  return (
    <>
      <h2>Set birthyear</h2>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
        onSubmit={handleSubmit}
      >
        <label>
          name
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label>
          born
          <input
            type="number"
            value={born ?? ""}
            onChange={(event) => setBorn(Number(event.target.value))}
          />
        </label>
        <button type="submit">update author</button>
      </form>
    </>
  );
};

export default UpdateAuthor;
