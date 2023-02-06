import { FormEventHandler, useState } from "react";
import {
  useAddBookMutation,
  AllAuthorsDocument,
  AllBooksDocument,
} from "../generated/graphql";

const NewBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState<number | undefined>();
  const [genres, setGenres] = useState<string[]>([]);
  const [genre, setGenre] = useState("");
  const [addBook] = useAddBookMutation({
    refetchQueries: [
      { query: AllAuthorsDocument },
      { query: AllBooksDocument },
    ],
  });

  const submit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!(title && author && published && genres.length)) {
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

  const addGenre = () => {
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
