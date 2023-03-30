import { useAllBooksQuery, useMeQuery } from "../generated/graphql";

const Recommend = (): JSX.Element => {
  const me = useMeQuery();
  const recommendedBooks = useAllBooksQuery({
    variables: {
      genre: me.data?.me?.favouriteGenre,
    },
    skip: me.data?.me?.favouriteGenre === undefined,
  });

  if (recommendedBooks.loading || me.loading) {
    return <h2>LOADING</h2>;
  }

  if (recommendedBooks.error != null) {
    return (
      <p>
        recommended books error
        <br />
        {JSON.stringify(recommendedBooks.error)}
      </p>
    );
  }

  if (me.error != null) {
    return (
      <p>
        me error
        <br />
        {JSON.stringify(me.error)}
      </p>
    );
  }

  return (
    <>
      <h2>recommendations</h2>
      <h3>books in your favorite genre {me.data?.me?.favouriteGenre}</h3>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {recommendedBooks.data?.allBooks?.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Recommend;
