import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import { Alert, StyleSheet, View } from "react-native";
import { object, ref, string } from "yup";
import { type CreateUserInput } from "../generated/gql/graphql";
import { CreateUserMutationDocument } from "../graphql/mutations/CreateUser";
import useSignIn from "../hooks/useSignIn";
import AppButton from "./AppButton";
import FormikTextInput from "./FormikTextInput";

const styles = StyleSheet.create({
  form: {
    display: "flex",
    rowGap: 12,
    padding: 16,
  },
});

interface CreateUserForm extends CreateUserInput {
  passwordConfirmation: string;
}

const signUpFormSchema = object({
  username: string().required("Username is required").min(5).max(30),
  password: string().required("Password is required").min(5).max(50),
  passwordConfirmation: string()
    .required("Password confirmation is required")
    .oneOf([ref("password")], "Password does not match"),
});

const SignUp = (): JSX.Element => {
  const initialValues: CreateUserForm = {
    username: "",
    password: "",
    passwordConfirmation: "",
  };
  const [createUser, { loading: createUserLoading }] = useMutation(
    CreateUserMutationDocument
  );
  const [signIn, { loading: signInLoading }] = useSignIn();

  const signUp = async ({
    passwordConfirmation,
    ...user
  }: CreateUserForm): Promise<void> => {
    try {
      await createUser({
        variables: {
          user,
        },
      });
      await signIn(user);
    } catch (error) {
      Alert.alert(
        error instanceof Error
          ? error.message
          : "An unknown error occurred while creating new user"
      );
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={signUp}
      validationSchema={signUpFormSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.form}>
          <FormikTextInput<keyof CreateUserForm>
            name="username"
            placeholder="Username"
          />
          <FormikTextInput<keyof CreateUserForm>
            name="password"
            placeholder="Password"
            secureTextEntry
          />
          <FormikTextInput<keyof CreateUserForm>
            name="passwordConfirmation"
            placeholder="Password confirmation"
            secureTextEntry
          />
          <AppButton
            // HACK:
            // https://github.com/jaredpalmer/formik/issues/376
            onPress={(event) => {
              handleSubmit(event as any);
            }}
            disabled={createUserLoading || signInLoading}
          >
            Sign up
          </AppButton>
        </View>
      )}
    </Formik>
  );
};

export default SignUp;
