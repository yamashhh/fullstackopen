import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import LoginForm from '../components/molecules/LoginForm/LoginForm'

const Login = () => {
  const user = useSelector((state) => state.user)

  if (user) {
    return <Navigate to="/" replace={true} />
  }

  return (
    <>
      <h2 data-testid="appHeading">Log in to application</h2>
      <LoginForm />
    </>
  )
}

export default Login
