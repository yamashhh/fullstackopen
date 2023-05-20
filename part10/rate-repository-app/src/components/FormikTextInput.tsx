import { useField } from "formik";
import { type ComponentProps } from "react";
import { StyleSheet, Text } from "react-native";
import TextInput from "./TextInput";

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
  },
});

interface Props<Type> extends ComponentProps<typeof TextInput> {
  name: Type;
}

const FormikTextInput = <T extends string>({
  name,
  ...props
}: Props<T>): JSX.Element => {
  const [field, meta] = useField(name);
  const isError = meta.touched && meta.error !== undefined;

  return (
    <>
      <TextInput
        onChangeText={field.onChange(name)}
        onBlur={field.onBlur(name)}
        value={field.value}
        {...props}
      />
      {isError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;
