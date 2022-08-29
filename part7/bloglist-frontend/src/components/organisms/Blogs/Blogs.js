import Blog from '../../molecules/Blog/Blog'
import BlogForm from '../../molecules/BlogForm/BlogForm'
import { useSelector } from 'react-redux'
import { blogsSelector } from '../../../features/blogsSlice'
import { useDispatch } from 'react-redux'
import { logout } from '../../../features/userSlice'

const Blogs = ({ user }) => {
  const blogs = useSelector(blogsSelector)
  const dispatch = useDispatch()

  return (
    <>
      <section
        style={{ display: 'flex', alignItems: 'center' }}
        data-testid="userSection"
      >
        <p>{user.name} logged in</p>
        <button onClick={() => dispatch(logout())}>logout</button>
      </section>
      <BlogForm />
      {blogs.map((blog) => (
        <Blog key={blog.id} {...{ blog }} />
      ))}
    </>
  )
}

export default Blogs
