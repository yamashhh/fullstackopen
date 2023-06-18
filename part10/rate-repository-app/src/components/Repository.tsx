import { useQuery } from "@apollo/client";
import { openURL } from "expo-linking";
import { StyleSheet, View } from "react-native";
import { useParams } from "react-router-native";
import { useFragment } from "../generated/gql";
import { RepositoryItemFragment } from "../graphql/fragments/RepositoryItem";
import { RepositoryQueryDocument } from "../graphql/queries/Repository";
import theme from "../theme";
import AppButton from "./AppButton";
import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
  buttonWrap: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: 16,
    paddingBottom: 16,
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
  });
  const repositoryItem = useFragment(RepositoryItemFragment, data?.repository);
  const url = repositoryItem?.url;

  return (
    <View style={styles.background}>
      {data?.repository != null && <RepositoryItem item={data.repository} />}
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
    </View>
  );
};

export default Repository;
