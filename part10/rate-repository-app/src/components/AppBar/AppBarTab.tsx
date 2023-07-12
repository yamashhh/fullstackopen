import { type ReactNode } from "react";
import { StyleSheet } from "react-native";
import { Link, type To } from "react-router-native";
import Text from "../Text";

interface AppBarTabProps {
  children: ReactNode;
  to: To;
}

const styles = StyleSheet.create({
  link: {
    padding: 4,
  },
});

const AppBarTab = ({ children, to }: AppBarTabProps): JSX.Element => {
  return (
    <Link style={styles.link} to={to}>
      <Text color="white" fontSize="subheading" fontWeight="bold">
        {children}
      </Text>
    </Link>
  );
};

export default AppBarTab;
