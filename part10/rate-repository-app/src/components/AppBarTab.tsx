import { type ReactNode } from "react";
import { Pressable, StyleSheet } from "react-native";
import Text from "./Text";

interface AppBarTabProps {
  children: ReactNode;
}

const styles = StyleSheet.create({
  pressable: {
    padding: 4,
  },
});

const AppBarTab = ({ children }: AppBarTabProps): JSX.Element => {
  return (
    <Pressable style={styles.pressable}>
      <Text color="white" fontSize="subheading" fontWeight="bold">
        {children}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;
