import { useQuery } from "@apollo/client";
import { useMemo, useState } from "react";
import {
  AllRepositoriesOrderBy,
  OrderDirection,
} from "../../generated/gql/graphql";
import { PaginatedRepositoriesQueryDocument } from "../../graphql/queries/PaginatedRepositories";
import { useDebounce } from "../../hooks/useDebounce";
import PureRepositoryList from "./PureRepositoryList";
import { RepositoryListContext, SORT_KEY } from "./RepositoryListContext";

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
  const [searchKeyword, setSearchKeyword] = useState("");
  const debouncedSearchKeyword = useDebounce(searchKeyword, 500);

  const { data, loading, fetchMore } = useQuery(
    PaginatedRepositoriesQueryDocument,
    {
      variables: {
        first: 5,
        ...sortVariables,
        searchKeyword: debouncedSearchKeyword,
      },
      fetchPolicy: "cache-and-network",
    }
  );

  return (
    <RepositoryListContext.Provider
      value={{ sortKey, setSortKey, searchKeyword, setSearchKeyword }}
    >
      <PureRepositoryList data={data} fetchMore={fetchMore} loading={loading} />
    </RepositoryListContext.Provider>
  );
};

export default RepositoryList;
