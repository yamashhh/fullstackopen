import Blog from '../../molecules/Blog/Blog'
import { useSelector } from 'react-redux'
import { blogsSelector } from '../../../features/blogsSlice'

const Blogs = ({ user }) => {
  const blogs = useSelector(blogsSelector)

  return (
    <>
      {blogs.map((blog) => (
        <Blog key={blog.id} {...{ blog }} />
      ))}
    </>
  )
}

export default Blogs
