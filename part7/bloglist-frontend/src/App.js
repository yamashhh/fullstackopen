import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blogs from './components/organisms/Blogs/Blogs'
import LoginForm from './components/molecules/LoginForm/LoginForm'
import Snackbar from './components/atoms/Snackbar/Snackbar'
import { setSnackbar } from './features/snackbarSlice'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './features/blogsSlice'

const App = () => {
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleSetUser = (user) => {
    setUser(user)
    blogService.setToken(user?.token ?? null)
  }

  useEffect(() => {
    const userInStorage = window.localStorage.getItem('part-7-bloglist-user')
    const parsedUser = JSON.parse(userInStorage)
    if (parsedUser) {
      handleSetUser(parsedUser)
    }
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const result = await loginService.login(credentials)
      window.localStorage.setItem(
        'part-7-bloglist-user',
        JSON.stringify(result)
      )
      handleSetUser(result)
      dispatch(
        setSnackbar({ message: `logged in as ${result.name}`, isError: false })
      )
    } catch (exception) {
      dispatch(
        setSnackbar({
          message: exception?.response?.data?.error ?? `${exception}`,
          isError: true,
        })
      )
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('part-7-bloglist-user')
    handleSetUser(null)
  }

  const handleUpdate = async (id, blog) => {
    try {
      const updatedBlog = await blogService.update(id, blog)
      setBlogs((previous) =>
        previous.map((blog) => (blog.id === id ? updatedBlog : blog))
      )
      dispatch(
        setSnackbar({
          message: `blog ${updatedBlog.title} by ${updatedBlog.author} updated`,
          isError: false,
        })
      )
    } catch (error) {
      dispatch(
        setSnackbar({
          message: error?.response?.data?.error ?? `${error}`,
          isError: true,
        })
      )
      throw error
    }
  }

  const handleDelete = async (blogToDelete) => {
    if (
      window.confirm(
        `remove blog ${blogToDelete.title} by ${blogToDelete.author}?`
      )
    ) {
      try {
        await blogService.deleteBlog(blogToDelete.id)
        setBlogs((previous) =>
          previous.filter((blog) => blog.id !== blogToDelete.id)
        )
        dispatch(
          setSnackbar({
            message: `blog ${blogToDelete.title} by ${blogToDelete.author} deleted`,
            isError: false,
          })
        )
      } catch (error) {
        dispatch(
          setSnackbar({
            message: error?.response?.data?.error ?? `${error}`,
            isError: true,
          })
        )
        throw error
      }
    }
  }

  return (
    <main>
      <h2 data-testid="appHeading">
        {user ? 'blogs' : 'Log in to application'}
      </h2>
      <Snackbar />
      {user ? (
        <Blogs
          {...{
            user,
            handleLogout,
            handleUpdate,
            handleDelete,
          }}
        />
      ) : (
        <LoginForm handleLogin={handleLogin} />
      )}
    </main>
  )
}

export default App
