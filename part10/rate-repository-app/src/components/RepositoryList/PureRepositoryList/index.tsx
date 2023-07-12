import { type useQuery } from "@apollo/client";
import { FlatList, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import { useFragment } from "../../../generated/gql";
import {
  type PaginatedRepositoriesQuery,
  type PaginatedRepositoriesQueryVariables,
} from "../../../generated/gql/graphql";
import { PageInfoFragment } from "../../../graphql/fragments/PageInfo";
import { RepositoryItemFragment } from "../../../graphql/fragments/RepositoryItem";
import theme from "../../../theme";
import ItemSeparator from "../../ItemSeparator";
import RepositoryItem from "../../RepositoryItem";
import RepositoryListHeader from "./RepositoryListHeader";

const styles = StyleSheet.create({
  list: {
    backgroundColor: theme.colors.background,
  },
});

interface Props {
  data?: PaginatedRepositoriesQuery;
  fetchMore: ReturnType<
    typeof useQuery<
      PaginatedRepositoriesQuery,
      PaginatedRepositoriesQueryVariables
    >
  >["fetchMore"];
  loading: boolean;
  variables?: PaginatedRepositoriesQueryVariables;
}

const PureRepositoryList = ({
  data,
  fetchMore,
  loading,
  variables,
}: Props): JSX.Element => {
  const pageInfo = useFragment(PageInfoFragment, data?.repositories.pageInfo);
  const handleFetchMore = async (): Promise<void> => {
    if (loading || pageInfo?.hasNextPage == null || !pageInfo.hasNextPage) {
      return;
    }
    await fetchMore({
      variables: {
        after: pageInfo.endCursor,
      },
    });
  };

  return (
    <FlatList
      style={styles.list}
      data={
        data != null ? data.repositories.edges.map((edge) => edge.node) : null
      }
      ListHeaderComponent={<RepositoryListHeader />}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item: repository }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const item = useFragment(RepositoryItemFragment, repository);
        return (
          <Link to={`/repository/${item.id}`}>
            <RepositoryItem item={repository} />
          </Link>
        );
      }}
      onEndReached={() => {
        void handleFetchMore();
      }}
      onEndReachedThreshold={0.5}
    />
  );
};

export default PureRepositoryList;
