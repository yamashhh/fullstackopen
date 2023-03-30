import { useAllAuthorsQuery } from "../generated/graphql";
import UpdateAuthor from "./UpdateAuthor";

const Authors = ({ token }: { token: string | null }): JSX.Element => {
  const { data, loading, error } = useAllAuthorsQuery();

  if (loading) {
    return <div>LOADING</div>;
  }

  if (error != null) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data?.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {data?.allAuthors != null && token != null && (
        <UpdateAuthor authors={data.allAuthors} />
      )}
    </>
  );
};

export default Authors;
