import { type ComponentPropsWithoutRef, type ReactNode } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
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
  style: StyleProp<ViewStyle>;
}

const AppButton = ({ children, style, ...props }: Props): JSX.Element => {
  return (
    <Pressable style={[styles.button, style]} {...props}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default AppButton;
