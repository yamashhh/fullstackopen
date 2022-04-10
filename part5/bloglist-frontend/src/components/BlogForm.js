import Input from './Input'

const BlogForm = ({
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  handleCreate,
}) => {
  return (
    <form
      onSubmit={handleCreate}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <h3>create new</h3>
      <Input label="title:" value={title} setValue={setTitle} />
      <Input label="author:" value={author} setValue={setAuthor} />
      <Input label="url:" value={url} setValue={setUrl} />
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
