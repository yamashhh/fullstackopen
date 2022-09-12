import { useAllAuthorsQuery } from "../generated/graphql";

type Props = {
  show: boolean;
};

const Authors = (props: Props) => {
  const { data, loading, error } = useAllAuthorsQuery();

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
    </div>
  );
};

export default Authors;
