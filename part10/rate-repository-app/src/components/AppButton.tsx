import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
});

interface Props extends ComponentPropsWithoutRef<typeof Pressable> {
  children: ReactNode;
}

const AppButton = ({ children, ...props }: Props): JSX.Element => {
  return (
    <Pressable style={styles.button} {...props}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default AppButton;
