import { useQuery } from "@apollo/client";
import Constants from "expo-constants";
import { ScrollView, StyleSheet, View } from "react-native";
import { MeDocument } from "../../graphql/queries/Me";
import useSignOut from "../../hooks/useSignOut";
import theme from "../../theme";
import AppBarButton from "./AppBarButton";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight + 12,
    paddingHorizontal: 12,
    paddingBottom: 12,
    backgroundColor: theme.colors.textPrimary,
  },
  scroll: {
    display: "flex",
    columnGap: 8,
  },
});

const AppBar = (): JSX.Element => {
  const { data } = useQuery(MeDocument);
  const { signOut } = useSignOut();
  const isLoggedIn = data?.me != null;

  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scroll}>
        <AppBarTab to="/">Repositories</AppBarTab>
        {isLoggedIn ? (
          <>
            <AppBarTab to="/create-review">Create a review</AppBarTab>
            <AppBarButton
              onPress={() => {
                void signOut();
              }}
            >
              Sign out
            </AppBarButton>
          </>
        ) : (
          <AppBarTab to="/sign-in">Sign in</AppBarTab>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
