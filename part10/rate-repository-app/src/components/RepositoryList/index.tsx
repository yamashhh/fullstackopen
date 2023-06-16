import { useQuery } from "@apollo/client";
import { OrderDirection } from "../../generated/gql/graphql";
import { PaginatedRepositoriesQueryDocument } from "../../graphql/queries/PaginatedRepositories";
import PureRepositoryList from "./PureRepositoryList";

const RepositoryList = (): JSX.Element => {
  const { data } = useQuery(PaginatedRepositoriesQueryDocument, {
    variables: {
      first: 30,
      orderDirection: OrderDirection.Asc,
    },
  });

  return <PureRepositoryList data={data} />;
};

export default RepositoryList;
