import { useAllBooksQuery } from "../generated/graphql";

type Props = {
  show: boolean;
};

const Books = (props: Props) => {
  const { data, loading, error } = useAllBooksQuery();

  if (!props.show) {
    return null;
  }

  if (loading) {
    return <div>LOADING</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
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
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
