import { useState } from 'react'
import Input from '../../atoms/Input/Input'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await handleLogin({ username, password })
      setUsername('')
      setPassword('')
    } catch {
      // error handling done in handleLogin
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
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

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm
