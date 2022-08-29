import { useEffect } from 'react'
import Blogs from './components/organisms/Blogs/Blogs'
import LoginForm from './components/molecules/LoginForm/LoginForm'
import Snackbar from './components/atoms/Snackbar/Snackbar'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './features/blogsSlice'
import { setUser } from './features/userSlice'

const App = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const userInStorage = window.localStorage.getItem('part-7-bloglist-user')
    const parsedUser = JSON.parse(userInStorage)
    if (parsedUser) {
      dispatch(setUser(parsedUser))
    }
  }, [dispatch])

  return (
    <main>
      <h2 data-testid="appHeading">
        {user ? 'blogs' : 'Log in to application'}
      </h2>
      <Snackbar />
      {user ? <Blogs user={user} /> : <LoginForm />}
    </main>
  )
}

export default App
