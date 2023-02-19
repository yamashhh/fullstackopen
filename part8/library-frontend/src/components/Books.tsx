import { useMemo, useState } from "react";
import { useAllBooksQuery } from "../generated/graphql";

const Books = (): JSX.Element => {
  const { data, loading, error } = useAllBooksQuery();
  const genres = useMemo(() => {
    const genreSet = new Set(data?.allBooks?.flatMap((book) => book.genres));
    return Array.from(genreSet);
  }, [data?.allBooks]);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const selectedData = useMemo(() => {
    if (selectedGenre === null) {
      return data?.allBooks;
    }
    return data?.allBooks?.filter((book) =>
      book.genres.includes(selectedGenre ?? "")
    );
  }, [data?.allBooks, selectedGenre]);

  if (loading) {
    return <div>LOADING</div>;
  }

  if (error != null) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {selectedData?.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setSelectedGenre(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setSelectedGenre(null)}>all genres</button>
      </div>
    </>
  );
};

export default Books;
