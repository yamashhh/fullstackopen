import { useEffect } from 'react'
import Snackbar from './components/atoms/Snackbar/Snackbar'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './features/blogsSlice'
import { setUser } from './features/userSlice'
import { Routes, Route, NavLink } from 'react-router-dom'
import Users from './pages/Users'
import Index from './pages/Index'
import User from './pages/User'

const App = () => {
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
    <>
      <header>
        <nav>
          <ul>
            <li>
              <NavLink to="/">index</NavLink>
            </li>
            <li>
              <NavLink to="/users">users</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Snackbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:userId" element={<User />} />
        </Routes>
      </main>
    </>
  )
}

export default App
