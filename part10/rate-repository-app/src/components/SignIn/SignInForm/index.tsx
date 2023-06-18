import { Formik } from "formik";
import { StyleSheet, View } from "react-native";
import { object, string } from "yup";
import { type AuthenticateInput } from "../../../generated/gql/graphql";
import type useSignIn from "../../../hooks/useSignIn";
import AppButton from "../../AppButton";
import FormikTextInput from "../../FormikTextInput";

const styles = StyleSheet.create({
  form: {
    display: "flex",
    rowGap: 12,
    padding: 16,
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
          <AppButton
            // HACK:
            // https://github.com/jaredpalmer/formik/issues/376
            onPress={(event) => {
              handleSubmit(event as any);
            }}
            disabled={false}
          >
            {SIGN_IN_TEXT}
          </AppButton>
        </View>
      )}
    </Formik>
  );
};

export default SignInForm;
