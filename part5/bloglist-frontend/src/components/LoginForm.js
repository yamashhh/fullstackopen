import Input from './Input'

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  return (
    <form
      onSubmit={handleLogin}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <Input label="username" value={username} setValue={setUsername} />
      <Input
        label="password"
        type="password"
        value={password}
        setValue={setPassword}
      />
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
