import Input from '../../atoms/Input/Input'
import { useState } from 'react'

const BlogForm = ({ handleSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleEvent = async (event) => {
    event.preventDefault()
    try {
      await handleSubmit({ title, author, url })
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch {
      // error handling done in handleCreate
    }
  }

  return (
    <form
      onSubmit={handleEvent}
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
  )
}

export default BlogForm
