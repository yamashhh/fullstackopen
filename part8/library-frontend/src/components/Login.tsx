import { Dispatch, SetStateAction, useState } from "react";
import { PAGE_TYPE, LOCAL_STORAGE_KEY } from "../constants";
import { useLoginMutation } from "../generated/graphql";

const Login = ({
  setToken,
  setPage,
}: {
  setToken: Dispatch<SetStateAction<string | null>>;
  setPage: Dispatch<SetStateAction<typeof PAGE_TYPE[keyof typeof PAGE_TYPE]>>;
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();

  return (
    <>
      <h2>Login</h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const { data } = await login({ variables: { username, password } });
          const token = data?.login?.value;
          if (!token) {
            return;
          }
          setToken(token);
          localStorage.setItem(LOCAL_STORAGE_KEY, token);
          setPage(PAGE_TYPE.AUTHORS);
        }}
      >
        <label>
          username
          <input
            type="text"
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label>
          password
          <input
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default Login;
