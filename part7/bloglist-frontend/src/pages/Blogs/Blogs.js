import { useSelector } from 'react-redux'
import { blogsSelector } from '../../features/blogsSlice'
import { Link } from 'react-router-dom'
import BlogForm from '../../components/molecules/BlogForm/BlogForm'
import { Navigate } from 'react-router-dom'
import { Container, OL } from './Blogs.styles'

const Blogs = () => {
  const user = useSelector((state) => state.user)
  const blogs = useSelector(blogsSelector)

  if (!user) {
    return <Navigate to="/login" replace={true} />
  }

  return (
    <Container>
      <h2 data-testid="appHeading">blog app</h2>
      <BlogForm />
      <OL>
        {blogs?.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </OL>
    </Container>
  )
}

export default Blogs
