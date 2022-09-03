import { useSelector } from 'react-redux'
import Blogs from '../components/organisms/Blogs/Blogs'
import LoginForm from '../components/molecules/LoginForm/LoginForm'

const Index = () => {
  const user = useSelector((state) => state.user)

  return (
    <>
      <h2 data-testid="appHeading">
        {user ? 'blogs' : 'Log in to application'}
      </h2>
      {user ? <Blogs user={user} /> : <LoginForm />}
    </>
  )
}

export default Index
