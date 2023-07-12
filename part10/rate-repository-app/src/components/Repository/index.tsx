import { useQuery } from "@apollo/client";
import { FlatList, StyleSheet } from "react-native";
import { useParams } from "react-router-native";
import { useFragment } from "../../generated/gql";
import { PageInfoFragment } from "../../graphql/fragments/PageInfo";
import { RepositoryQueryDocument } from "../../graphql/queries/Repository";
import theme from "../../theme";
import ItemSeparator from "../ItemSeparator";
import ReviewItem from "../ReviewItem";
import RepositoryInfo from "./RepositoryInfo";

const styles = StyleSheet.create({
  list: {
    backgroundColor: theme.colors.background,
  },
});

const Repository = (): JSX.Element | null => {
  const { repositoryId } = useParams();
  const { data, loading, fetchMore } = useQuery(RepositoryQueryDocument, {
    variables:
      repositoryId != null
        ? {
            repositoryId,
            first: 3,
          }
        : undefined,
    skip: repositoryId == null,
    fetchPolicy: "cache-and-network",
  });
  const repositoryItem = data?.repository;
  const pageInfo = useFragment(
    PageInfoFragment,
    repositoryItem?.reviews.pageInfo
  );
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

  if (repositoryItem == null) {
    return null;
  }

  return (
    <FlatList
      style={styles.list}
      data={data?.repository?.reviews.edges.map((edge) => edge.node)}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ListHeaderComponent={() => (
        <RepositoryInfo repositoryItem={repositoryItem} />
      )}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={() => {
        void handleFetchMore();
      }}
      onEndReachedThreshold={0.5}
    />
  );
};

export default Repository;
