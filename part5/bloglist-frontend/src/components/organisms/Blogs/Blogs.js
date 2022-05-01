import Blog from '../../molecules/Blog/Blog'
import BlogForm from '../../molecules/BlogForm/BlogForm'
import Togglable from '../../atoms/Togglable/Togglable'
import { useRef } from 'react'

const Blogs = ({
  blogs,
  user,
  handleLogout,
  handleCreate,
  handleUpdate,
  handleDelete,
}) => {
  const togglable = useRef()
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  const handleSubmit = async (blog) => {
    try {
      await handleCreate(blog)
      togglable.current.toggleVisibility()
    } catch (error) {
      throw error
    }
  }

  return (
    <>
      <section
        style={{ display: 'flex', alignItems: 'center' }}
        data-testid="userSection"
      >
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
      </section>
      <Togglable buttonLabel="new note" ref={togglable}>
        <BlogForm handleSubmit={handleSubmit} />
      </Togglable>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} {...{ blog, handleUpdate, handleDelete }} />
      ))}
    </>
  )
}

export default Blogs
