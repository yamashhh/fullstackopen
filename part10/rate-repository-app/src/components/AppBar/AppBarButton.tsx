import { type ReactNode } from "react";
import { Pressable, StyleSheet, type PressableProps } from "react-native";
import Text from "../Text";

interface AppBarButtonProps {
  children: ReactNode;
  onPress: PressableProps["onPress"];
}

const styles = StyleSheet.create({
  link: {
    padding: 4,
  },
});

const AppBarButton = ({
  children,
  onPress,
}: AppBarButtonProps): JSX.Element => {
  return (
    <Pressable style={styles.link} onPress={onPress}>
      <Text color="white" fontSize="subheading" fontWeight="bold">
        {children}
      </Text>
    </Pressable>
  );
};

export default AppBarButton;
