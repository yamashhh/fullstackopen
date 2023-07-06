import { FlatList, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import { useFragment } from "../../../generated/gql";
import { type PaginatedRepositoriesQuery } from "../../../generated/gql/graphql";
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
}

const PureRepositoryList = ({ data }: Props): JSX.Element => {
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
    />
  );
};

export default PureRepositoryList;
