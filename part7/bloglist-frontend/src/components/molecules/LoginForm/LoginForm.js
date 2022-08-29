import { useState } from 'react'
import Input from '../../atoms/Input/Input'
import { useDispatch } from 'react-redux'
import { login } from '../../../features/userSlice'
import { setSnackbar } from '../../../features/snackbarSlice'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await dispatch(login({ username, password })).unwrap()
      dispatch(
        setSnackbar({ message: `logged in as ${username}`, isError: false })
      )
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch(
        setSnackbar({
          message: error?.message,
          isError: true,
        })
      )
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
      <Input
        label="username"
        value={username}
        setValue={setUsername}
        testId="usernameInput"
      />
      <Input
        label="password"
        type="password"
        value={password}
        setValue={setPassword}
        testId="passwordInput"
      />
      <button type="submit" data-testid="loginButton">
        login
      </button>
    </form>
  )
}

export default LoginForm
