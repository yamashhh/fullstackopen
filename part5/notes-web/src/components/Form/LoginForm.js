const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <label>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
