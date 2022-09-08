import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { deleteBlog, updateBlog } from '../../../features/blogsSlice'
import { setSnackbar } from '../../../features/snackbarSlice'
import { useNavigate } from 'react-router-dom'
import Comments from '../../molecules/Comments/Comments'
import { Button } from '../../atoms/Button/Button.styles'

const Blog = ({ blog }) => {
  const [isUpdatingLikes, setIsUpdatingLikes] = useState(false)
  const [isRemovingBlog, setIsRemovingBlog] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLike = async () => {
    try {
      setIsUpdatingLikes(true)
      await dispatch(
        updateBlog({
          id: blog.id,
          blog: { likes: blog.likes + 1 },
        })
      ).unwrap()
      dispatch(
        setSnackbar({
          message: `blog ${blog.title} by ${blog.author} updated`,
          isError: false,
        })
      )
    } catch (error) {
      dispatch(
        setSnackbar({
          message: error?.message,
          isError: true,
        })
      )
    } finally {
      setIsUpdatingLikes(false)
    }
  }

  const handleRemove = async () => {
    if (!window.confirm(`remove blog ${blog.title} by ${blog.author}?`)) {
      return
    }

    try {
      setIsRemovingBlog(true)
      await dispatch(deleteBlog(blog)).unwrap()
      dispatch(
        setSnackbar({
          message: `blog ${blog.title} by ${blog.author} deleted`,
          isError: false,
        })
      )
      navigate('/')
    } catch (error) {
      dispatch(
        setSnackbar({
          message: error?.message,
          isError: true,
        })
      )
    } finally {
      setIsRemovingBlog(false)
    }
  }

  return (
    <article data-testid="blogArticle">
      <h2 data-testid="blogHeading">
        {blog.title} {blog.author}
      </h2>
      <ul style={{ listStyle: 'none' }}>
        <li data-testid="blogUrl">
          <a href={blog.url}>{blog.url}</a>
        </li>
        <li data-testid="blogLikes">
          {blog.likes} likes
          <Button
            onClick={handleLike}
            disabled={isUpdatingLikes}
            data-testid="likeButton"
          >
            like
          </Button>
        </li>
        <li data-testid="blogUserName">added by {blog.user.name}</li>
      </ul>
      <Button
        onClick={handleRemove}
        disabled={isRemovingBlog}
        data-testid="deleteButton"
      >
        remove
      </Button>
      <Comments blog={blog} />
    </article>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    comment: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired,
    }),
  }).isRequired,
}
export default Blog
