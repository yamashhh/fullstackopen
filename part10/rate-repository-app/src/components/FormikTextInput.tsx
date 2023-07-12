import { useField } from "formik";
import { type ComponentProps } from "react";
import { StyleSheet, Text, View } from "react-native";
import theme from "../theme";
import TextInput from "./TextInput";

const styles = StyleSheet.create({
  wrap: {
    display: "flex",
    rowGap: 5,
  },
  errorText: {
    color: theme.colors.red,
    fontSize: theme.fontSizes.body,
  },
});

interface Props<Type> extends Omit<ComponentProps<typeof TextInput>, "error"> {
  name: Type;
}

const FormikTextInput = <T extends string>({
  name,
  ...props
}: Props<T>): JSX.Element => {
  const [{ value, onChange, onBlur }, { touched, error }] = useField(name);
  const isError = touched && error !== undefined;

  return (
    <View style={styles.wrap}>
      <TextInput
        onChangeText={onChange(name)}
        onBlur={onBlur(name)}
        value={value}
        error={isError}
        {...props}
      />
      {isError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default FormikTextInput;
