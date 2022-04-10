import Blog from './Blog'
import BlogForm from './BlogForm'

const Blogs = ({
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
}) => {
  return (
    <>
      <section style={{ display: 'flex', alignItems: 'center' }}>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
      </section>
      <BlogForm
        {...{ title, setTitle, author, setAuthor, url, setUrl, handleCreate }}
      />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  )
}

export default Blogs
