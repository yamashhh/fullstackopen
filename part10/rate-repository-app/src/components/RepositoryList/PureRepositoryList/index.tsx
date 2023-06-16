import { FlatList, StyleSheet } from "react-native";
import { type PaginatedRepositoriesQuery } from "../../../generated/gql/graphql";
import theme from "../../../theme";
import RepositoryItem from "../../RepositoryItem";
import ItemSeparator from "./ItemSeparator";

const styles = StyleSheet.create({
  list: {
    backgroundColor: theme.colors.background,
  },
});

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
