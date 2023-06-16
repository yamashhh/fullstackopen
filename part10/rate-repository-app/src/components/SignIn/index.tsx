import useSignIn from "../../hooks/useSignIn";
import SignInForm from "./SignInForm";

const SignIn = (): JSX.Element => {
  const [signIn, { loading }] = useSignIn();

  return <SignInForm {...{ signIn, loading }} />;
};

export default SignIn;
