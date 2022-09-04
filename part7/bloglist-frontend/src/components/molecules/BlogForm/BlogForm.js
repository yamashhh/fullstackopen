import Input from '../../atoms/Input/Input'
import { useState, useRef } from 'react'
import Togglable from '../../atoms/Togglable/Togglable'
import { useDispatch } from 'react-redux'
import { createNewBlog } from '../../../features/blogsSlice'
import { setSnackbar } from '../../../features/snackbarSlice'

const BlogForm = () => {
  const togglable = useRef()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await dispatch(createNewBlog({ title, author, url })).unwrap()
      dispatch(
        setSnackbar({
          message: `a new blog ${title} by ${author} added`,
          isError: false,
        })
      )
      togglable.current.toggleVisibility()
      setTitle('')
      setAuthor('')
      setUrl('')
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
    <Togglable buttonLabel="create new" ref={togglable}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <h3>create new</h3>
        <Input
          label="title:"
          value={title}
          setValue={setTitle}
          testId="titleInput"
        />
        <Input
          label="author:"
          value={author}
          setValue={setAuthor}
          testId="authorInput"
        />
        <Input label="url:" value={url} setValue={setUrl} testId="urlInput" />
        <button type="submit" data-testid="createButton">
          create
        </button>
      </form>
    </Togglable>
  )
}

export default BlogForm
