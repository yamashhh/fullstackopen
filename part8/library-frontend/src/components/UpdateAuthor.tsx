import { type FormEvent, useState } from "react";
import {
  AllAuthorsDocument,
  useEditAuthorMutation,
  type Author,
} from "../generated/graphql";

interface Props {
  authors: Author[];
}

const UpdateAuthor = ({ authors }: Props): JSX.Element => {
  const [name, setName] = useState<string>("");
  const [born, setBorn] = useState<number | undefined>(undefined);
  const [editAuthor] = useEditAuthorMutation({
    refetchQueries: [{ query: AllAuthorsDocument }],
  });

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    if (!(name.length > 0 && born != null)) {
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
          <select
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          >
            <option value="" disabled>
              --Please choose an option--
            </option>
            {authors.map((author) => (
              <option key={author.id} value={author.name}>
                {author.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          born
          <input
            type="number"
            value={born ?? ""}
            onChange={(event) => {
              setBorn(Number(event.target.value));
            }}
          />
        </label>
        <button type="submit">update author</button>
      </form>
    </>
  );
};

export default UpdateAuthor;
