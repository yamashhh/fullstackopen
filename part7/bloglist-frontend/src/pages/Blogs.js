import { useSelector } from 'react-redux'
import LoginForm from '../components/molecules/LoginForm/LoginForm'
import { blogsSelector } from '../features/blogsSlice'
import { Link } from 'react-router-dom'
import BlogForm from '../components/molecules/BlogForm/BlogForm'

const Blogs = () => {
  const user = useSelector((state) => state.user)
  const blogs = useSelector(blogsSelector)

  return user ? (
    <>
      <h2 data-testid="appHeading">blog app</h2>
      <BlogForm />
      <ol>
        {blogs?.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ol>
    </>
  ) : (
    <>
      <h2 data-testid="appHeading">Log in to application</h2>
      <LoginForm />
    </>
  )
}

export default Blogs
