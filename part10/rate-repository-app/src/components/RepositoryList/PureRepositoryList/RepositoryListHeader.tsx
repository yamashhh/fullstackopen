import { Picker } from "@react-native-picker/picker";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import theme from "../../../theme";
import TextInput from "../../TextInput";
import { RepositoryListContext, SORT_KEY } from "../RepositoryListContext";

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  search: {
    backgroundColor: theme.colors.white,
  },
});

const RepositoryListHeader = (): JSX.Element => {
  const { sortKey, setSortKey, searchKeyword, setSearchKeyword } =
    useContext(RepositoryListContext) ?? {};

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search"
        value={searchKeyword}
        onChangeText={setSearchKeyword}
      />
      <Picker
        prompt="Select an item..."
        selectedValue={sortKey}
        onValueChange={(value) => {
          setSortKey?.(value);
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
    </View>
  );
};

export default RepositoryListHeader;
