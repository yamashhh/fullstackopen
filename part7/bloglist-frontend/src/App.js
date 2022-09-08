import { useEffect } from 'react'
import Snackbar from './components/atoms/Snackbar/Snackbar'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './features/blogsSlice'
import { initializeUsers } from './features/usersSlice'
import { setUser } from './features/userSlice'
import { Routes, Route } from 'react-router-dom'
import Users from './pages/Users'
import Blogs from './pages/Blogs/Blogs'
import User from './pages/User'
import Blog from './pages/Blog'
import Navigation from './components/molecules/Navigation/Navigation'
import { Layout, Main } from './App.styles'
import Login from './pages/Login'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const userInStorage = window.localStorage.getItem('part-7-bloglist-user')
    const parsedUser = JSON.parse(userInStorage)
    if (parsedUser) {
      dispatch(setUser(parsedUser))
    }
  }, [dispatch])

  return (
    <Layout>
      <header>
        <Navigation />
      </header>
      <Main>
        <Snackbar />
        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:userId" element={<User />} />
          <Route path="/blogs/:blogId" element={<Blog />} />
        </Routes>
      </Main>
    </Layout>
  )
}

export default App
