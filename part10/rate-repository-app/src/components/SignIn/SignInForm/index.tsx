import { Formik } from "formik";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { object, string } from "yup";
import { type AuthenticateInput } from "../../../generated/gql/graphql";
import type useSignIn from "../../../hooks/useSignIn";
import theme from "../../../theme";
import FormikTextInput from "../../FormikTextInput";

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

export const PLACEHOLDER = {
  USERNAME: "Username",
  PASSWORD: "Password",
};
export const SIGN_IN_TEXT = "Sign in";

const signInFormSchema = object({
  username: string().required("Username is required"),
  password: string().required("Password is required"),
});

interface Props {
  signIn: ReturnType<typeof useSignIn>[0];
  loading: ReturnType<typeof useSignIn>[1]["loading"];
}

const SignInForm = ({ signIn, loading }: Props): JSX.Element => {
  const initialValues: AuthenticateInput = { username: "", password: "" };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={signIn}
      validationSchema={signInFormSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.form}>
          <FormikTextInput<keyof AuthenticateInput>
            name="username"
            placeholder={PLACEHOLDER.USERNAME}
          />
          <FormikTextInput<keyof AuthenticateInput>
            name="password"
            placeholder={PLACEHOLDER.PASSWORD}
            secureTextEntry
          />
          <Pressable
            style={styles.button}
            // HACK:
            // https://github.com/jaredpalmer/formik/issues/376
            onPress={(event) => {
              handleSubmit(event as any);
            }}
            disabled={loading}
          >
            <Text style={styles.buttonText}>{SIGN_IN_TEXT}</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignInForm;
