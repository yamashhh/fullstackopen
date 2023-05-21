import Constants from "expo-constants";
import { ScrollView, StyleSheet, View } from "react-native";
import theme from "../theme";
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
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scroll}>
        <AppBarTab to="/">Repositories</AppBarTab>
        <AppBarTab to="/sign-in">Sign in</AppBarTab>
      </ScrollView>
    </View>
  );
};

export default AppBar;
