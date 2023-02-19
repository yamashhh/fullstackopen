import { FormEvent, useState } from "react";
import {
  useAddBookMutation,
  AllAuthorsDocument,
  AllBooksDocument,
  AllGenresDocument,
} from "../generated/graphql";

const NewBook = (): JSX.Element => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState<number | undefined>();
  const [genres, setGenres] = useState<string[]>([]);
  const [genre, setGenre] = useState("");
  const [addBook] = useAddBookMutation({
    refetchQueries: [
      { query: AllAuthorsDocument },
      { query: AllBooksDocument },
      { query: AllGenresDocument },
    ],
  });

  const submit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (
      !(
        title.length > 0 &&
        author.length > 0 &&
        published != null &&
        genres.length > 0
      )
    ) {
      return;
    }
    await addBook({
      variables: {
        title,
        author,
        published,
        genres,
      },
    });
    setTitle("");
    setPublished(undefined);
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = (): void => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published ?? ""}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </>
  );
};

export default NewBook;
