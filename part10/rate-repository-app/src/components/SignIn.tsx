import { Formik } from "formik";
import { Pressable, StyleSheet, Text, View } from "react-native";
import theme from "../theme";
import FormikTextInput from "./FormikTextInput";

const styles = StyleSheet.create({
  form: {
    display: "flex",
    rowGap: 12,
    padding: 16,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
});

interface SignInFormValues {
  username: string;
  password: string;
}

const SignIn = (): JSX.Element => {
  const initialValues: SignInFormValues = { username: "", password: "" };
  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ handleSubmit }) => (
          <View style={styles.form}>
            <FormikTextInput<keyof SignInFormValues>
              name="username"
              placeholder="Username"
            />
            <FormikTextInput<keyof SignInFormValues>
              name="password"
              placeholder="Password"
              secureTextEntry
            />
            <Pressable
              style={styles.button}
              // HACK:
              // https://github.com/jaredpalmer/formik/issues/376
              onPress={(event) => {
                handleSubmit(event as any);
              }}
            >
              <Text style={styles.buttonText}>Sign in</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignIn;
