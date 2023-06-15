import { useQuery } from "@apollo/client";
import { FlatList, StyleSheet, View } from "react-native";
import { OrderDirection } from "../generated/gql/graphql";
import { PaginatedRepositoriesQueryDocument } from "../graphql/queries/PaginatedRepositories";
import theme from "../theme";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  list: {
    backgroundColor: theme.colors.background,
  },
  separator: {
    height: 10,
  },
});

const ItemSeparator = (): JSX.Element => <View style={styles.separator} />;

const RepositoryList = (): JSX.Element => {
  const { data } = useQuery(PaginatedRepositoriesQueryDocument, {
    variables: {
      first: 30,
      orderDirection: OrderDirection.Asc,
    },
  });

  return (
    <FlatList
      style={styles.list}
      data={
        data != null ? data.repositories.edges.map((edge) => edge.node) : null
      }
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
    />
  );
};

export default RepositoryList;
