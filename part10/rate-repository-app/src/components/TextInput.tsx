import {
  TextInput as NativeTextInput,
  StyleSheet,
  type TextInputProps,
} from "react-native";
import theme from "../theme";

const styles = StyleSheet.create({
  textInput: {
    borderColor: theme.colors.textSecondary,
    borderRadius: 4,
    borderWidth: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  error: {
    borderColor: theme.colors.red,
  },
});

interface Props extends TextInputProps {
  error: boolean;
}

const TextInput = ({ error, style, ...props }: Props): JSX.Element => {
  return (
    <NativeTextInput
      style={[styles.textInput, ...(error ? [styles.error] : []), style]}
      {...props}
    />
  );
};

export default TextInput;
