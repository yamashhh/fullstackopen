import { useState, FormEventHandler, Dispatch, SetStateAction } from "react";
import { useLoginMutation } from "../generated/graphql";

const LoginForm = ({
  setError,
  setToken,
}: {
  setError: (message: string) => void;
  setToken: Dispatch<SetStateAction<string | null>>;
}): JSX.Element => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();

  const submit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const { data } = await login({
      variables: { username, password },
      onError(error) {
        setError(error.graphQLErrors[0].message);
      },
    });
    if (data?.login === null || data?.login === undefined) {
      return;
    }
    const token = data.login.value;
    setToken(token);
    localStorage.setItem("part8-phonebook-user-token", token);
  };

  return (
    <form onSubmit={submit}>
      <label>
        username
        <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
      <label>
        password
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
