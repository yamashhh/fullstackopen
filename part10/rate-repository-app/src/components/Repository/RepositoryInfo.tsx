import { openURL } from "expo-linking";
import { StyleSheet, View } from "react-native";
import { useFragment, type FragmentType } from "../../generated/gql";
import { RepositoryItemFragment } from "../../graphql/fragments/RepositoryItem";
import theme from "../../theme";
import AppButton from "../AppButton";
import ItemSeparator from "../ItemSeparator";
import RepositoryItem from "../RepositoryItem";

const styles = StyleSheet.create({
  buttonWrap: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

interface Props {
  repositoryItem: FragmentType<typeof RepositoryItemFragment>;
}

const RepositoryInfo = (props: Props): JSX.Element => {
  const url = useFragment(RepositoryItemFragment, props.repositoryItem).url;

  return (
    <>
      <RepositoryItem item={props.repositoryItem} />
      {url != null && (
        <View style={styles.buttonWrap}>
          <AppButton
            onPress={() => {
              void openURL(url);
            }}
          >
            Open in GitHub
          </AppButton>
        </View>
      )}
      <ItemSeparator />
    </>
  );
};

export default RepositoryInfo;
