import Blog from '../../molecules/Blog/Blog'
import BlogForm from '../../molecules/BlogForm/BlogForm'
import { useSelector } from 'react-redux'
import { blogsSelector } from '../../../features/blogsSlice'

const Blogs = ({ user, handleLogout, handleUpdate, handleDelete }) => {
  const blogs = useSelector(blogsSelector)

  return (
    <>
      <section
        style={{ display: 'flex', alignItems: 'center' }}
        data-testid="userSection"
      >
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
      </section>
      <BlogForm />
      {blogs.map((blog) => (
        <Blog key={blog.id} {...{ blog, handleUpdate, handleDelete }} />
      ))}
    </>
  )
}

export default Blogs
