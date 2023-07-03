import { Picker } from "@react-native-picker/picker";
import { type Dispatch, type SetStateAction } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import { SORT_KEY } from "..";
import { useFragment } from "../../../generated/gql";
import { type PaginatedRepositoriesQuery } from "../../../generated/gql/graphql";
import { RepositoryItemFragment } from "../../../graphql/fragments/RepositoryItem";
import theme from "../../../theme";
import ItemSeparator from "../../ItemSeparator";
import RepositoryItem from "../../RepositoryItem";

const styles = StyleSheet.create({
  list: {
    backgroundColor: theme.colors.background,
  },
});

interface Props {
  data?: PaginatedRepositoriesQuery;
  sortKey: (typeof SORT_KEY)[keyof typeof SORT_KEY];
  setSortKey: Dispatch<
    SetStateAction<(typeof SORT_KEY)[keyof typeof SORT_KEY]>
  >;
}

const PureRepositoryList = ({
  data,
  sortKey,
  setSortKey,
}: Props): JSX.Element => {
  return (
    <FlatList
      style={styles.list}
      data={
        data != null ? data.repositories.edges.map((edge) => edge.node) : null
      }
      ListHeaderComponent={
        <Picker
          prompt="Select an item..."
          selectedValue={sortKey}
          onValueChange={(value) => {
            setSortKey(value);
          }}
        >
          <Picker.Item label="Latest repositories" value={SORT_KEY.LATEST} />
          <Picker.Item
            label="Highest rated repositories"
            value={SORT_KEY.HIGHEST}
          />
          <Picker.Item
            label="Lowest rated repositories"
            value={SORT_KEY.LOWEST}
          />
        </Picker>
      }
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
