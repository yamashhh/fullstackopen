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
});

const TextInput = ({ style, ...props }: TextInputProps): JSX.Element => {
  return <NativeTextInput style={[styles.textInput, style]} {...props} />;
};

export default TextInput;
