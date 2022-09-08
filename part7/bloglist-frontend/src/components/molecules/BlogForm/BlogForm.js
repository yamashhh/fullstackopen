import Input from '../../atoms/Input/Input'
import { useState, useRef } from 'react'
import Togglable from '../../atoms/Togglable/Togglable'
import { useDispatch } from 'react-redux'
import { createNewBlog } from '../../../features/blogsSlice'
import { setSnackbar } from '../../../features/snackbarSlice'
import { Button } from '../../atoms/Button/Button.styles'
import { Form, H3 } from './BlogForm.styles'

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
      <Form onSubmit={handleSubmit}>
        <H3>create new</H3>
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
        <Button type="submit" data-testid="createButton">
          create
        </Button>
      </Form>
    </Togglable>
  )
}

export default BlogForm
