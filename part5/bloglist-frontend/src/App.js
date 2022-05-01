import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blogs from './components/organisms/Blogs/Blogs'
import LoginForm from './components/molecules/LoginForm/LoginForm'
import Snackbar from './components/atoms/Snackbar/Snackbar'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  const handleSetUser = (user) => {
    setUser(user)
    blogService.setToken(user?.token ?? null)
  }

  const showMessage = (message, error = false) => {
    setMessage(message)
    setIsError(error)
    setTimeout(() => {
      setMessage('')
      setIsError(false)
    }, 5000)
  }

  useEffect(() => {
    const userInStorage = window.localStorage.getItem('part-5-bloglist-user')
    const parsedUser = JSON.parse(userInStorage)
    if (parsedUser) {
      handleSetUser(parsedUser)
    }
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const result = await loginService.login(credentials)
      window.localStorage.setItem(
        'part-5-bloglist-user',
        JSON.stringify(result)
      )
      handleSetUser(result)
      showMessage(`logged in as ${result.name}`)
    } catch (exception) {
      showMessage(exception?.response?.data?.error ?? `${exception}`, true)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('part-5-bloglist-user')
    handleSetUser(null)
  }

  useEffect(() => {
    const getAllBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    getAllBlogs()
  }, [])

  const handleCreate = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      setBlogs((previous) => [...previous, newBlog])
      showMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    } catch (error) {
      showMessage(error?.response?.data?.error ?? `${error}`, true)
      throw error
    }
  }

  const handleUpdate = async (id, blog) => {
    try {
      const updatedBlog = await blogService.update(id, blog)
      setBlogs((previous) =>
        previous.map((blog) => (blog.id === id ? updatedBlog : blog))
      )
      showMessage(`blog ${updatedBlog.title} by ${updatedBlog.author} updated`)
    } catch (error) {
      showMessage(error?.response?.data?.error ?? `${error}`, true)
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
        showMessage(
          `blog ${blogToDelete.title} by ${blogToDelete.author} deleted`
        )
      } catch (error) {
        showMessage(error?.response?.data?.error ?? `${error}`, true)
        throw error
      }
    }
  }

  return (
    <main>
      <h2 data-testid="appHeading">
        {user ? 'blogs' : 'Log in to application'}
      </h2>
      {message && <Snackbar {...{ message, isError }} />}
      {user ? (
        <Blogs
          {...{
            blogs,
            user,
            handleLogout,
            handleCreate,
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
