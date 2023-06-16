import { FlatList, StyleSheet, View } from "react-native";
import { type PaginatedRepositoriesQuery } from "../../generated/gql/graphql";
import theme from "../../theme";
import RepositoryItem from "../RepositoryItem";

const styles = StyleSheet.create({
  list: {
    backgroundColor: theme.colors.background,
  },
  separator: {
    height: 10,
  },
});

const ItemSeparator = (): JSX.Element => <View style={styles.separator} />;

interface Props {
  data?: PaginatedRepositoriesQuery;
}

const PureRepositoryList = ({ data }: Props): JSX.Element => {
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

export default PureRepositoryList;
