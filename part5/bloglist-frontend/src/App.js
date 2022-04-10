import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Snackbar from './components/atoms/Snackbar/Snackbar'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const result = await loginService.login({ username, password })
      window.localStorage.setItem(
        'part-5-bloglist-user',
        JSON.stringify(result)
      )
      handleSetUser(result)
      setUsername('')
      setPassword('')
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

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create({
        title,
        author,
        url,
      })
      setBlogs((previous) => [...previous, blog])
      setTitle('')
      setAuthor('')
      setUrl('')
      showMessage(`a new blog ${blog.title} by ${blog.author} added`)
    } catch (exception) {
      showMessage(exception?.response?.data?.error ?? `${exception}`, true)
    }
  }

  return (
    <main>
      <h2>{user ? 'blogs' : 'Log in to application'}</h2>
      {message && <Snackbar {...{ message, isError }} />}
      {user ? (
        <Blogs
          {...{
            blogs,
            user,
            handleLogout,
            title,
            setTitle,
            author,
            setAuthor,
            url,
            setUrl,
            handleCreate,
          }}
        />
      ) : (
        <LoginForm
          {...{ handleLogin, username, setUsername, password, setPassword }}
        />
      )}
    </main>
  )
}

export default App
