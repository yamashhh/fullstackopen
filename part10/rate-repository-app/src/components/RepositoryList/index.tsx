import { useQuery } from "@apollo/client";
import { useMemo, useState } from "react";
import {
  AllRepositoriesOrderBy,
  OrderDirection,
} from "../../generated/gql/graphql";
import { PaginatedRepositoriesQueryDocument } from "../../graphql/queries/PaginatedRepositories";
import PureRepositoryList from "./PureRepositoryList";

export const SORT_KEY = {
  LATEST: "LATEST",
  HIGHEST: "HIGHEST",
  LOWEST: "LOWEST",
} as const;

const RepositoryList = (): JSX.Element => {
  const [sortKey, setSortKey] = useState<
    (typeof SORT_KEY)[keyof typeof SORT_KEY]
  >(SORT_KEY.LATEST);
  const sortVariables = useMemo(() => {
    switch (sortKey) {
      case SORT_KEY.LATEST: {
        return {
          orderBy: AllRepositoriesOrderBy.CreatedAt,
          orderDirection: OrderDirection.Desc,
        };
      }
      case SORT_KEY.HIGHEST: {
        return {
          orderBy: AllRepositoriesOrderBy.RatingAverage,
          orderDirection: OrderDirection.Desc,
        };
      }
      case SORT_KEY.LOWEST: {
        return {
          orderBy: AllRepositoriesOrderBy.RatingAverage,
          orderDirection: OrderDirection.Asc,
        };
      }
      default: {
        return {};
      }
    }
  }, [sortKey]);
  const { data } = useQuery(PaginatedRepositoriesQueryDocument, {
    variables: {
      first: 30,
      ...sortVariables,
    },
  });

  return (
    <PureRepositoryList data={data} sortKey={sortKey} setSortKey={setSortKey} />
  );
};

export default RepositoryList;
