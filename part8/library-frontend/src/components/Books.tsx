import { useAllBooksQuery } from "../generated/graphql";

const Books = () => {
  const { data, loading, error } = useAllBooksQuery();

  if (loading) {
    return <div>LOADING</div>;
  }

  if (error) {
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
          {data?.allBooks?.length &&
            data.allBooks.map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{JSON.stringify(a.author)}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default Books;
