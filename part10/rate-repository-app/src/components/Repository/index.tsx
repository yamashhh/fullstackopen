import { useQuery } from "@apollo/client";
import { FlatList, StyleSheet } from "react-native";
import { useParams } from "react-router-native";
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
  const { data } = useQuery(RepositoryQueryDocument, {
    variables:
      repositoryId != null
        ? {
            repositoryId,
          }
        : undefined,
    skip: repositoryId == null,
    fetchPolicy: "cache-and-network",
  });
  const repositoryItem = data?.repository;

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
    />
  );
};

export default Repository;
