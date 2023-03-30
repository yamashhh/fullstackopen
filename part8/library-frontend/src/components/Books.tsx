import { useState } from "react";
import { useAllBooksQuery, useAllGenresQuery } from "../generated/graphql";

const Books = (): JSX.Element => {
  const allBooks = useAllBooksQuery();
  const allGenres = useAllGenresQuery();
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  if (allBooks.loading || allGenres.loading) {
    return <div>LOADING</div>;
  }

  if (allBooks.error != null) {
    return (
      <p>
        all books error
        <br />
        {JSON.stringify(allBooks.error.message)}
      </p>
    );
  }

  if (allGenres.error != null) {
    return (
      <p>
        all genres error
        <br />
        {JSON.stringify(allGenres.error.message)}
      </p>
    );
  }

  return (
    <>
      <h2>books</h2>
      <h3>in genre {selectedGenre != null ? selectedGenre : "all genres"}</h3>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {allBooks.data?.allBooks?.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {allGenres.data?.allGenres?.map((genre) => (
          <button
            key={genre}
            onClick={async () => {
              setSelectedGenre(genre);
              await allBooks.refetch({ genre });
            }}
          >
            {genre}
          </button>
        ))}
        <button
          onClick={async () => {
            setSelectedGenre(null);
            await allBooks.refetch({ genre: null });
          }}
        >
          all genres
        </button>
      </div>
    </>
  );
};

export default Books;
