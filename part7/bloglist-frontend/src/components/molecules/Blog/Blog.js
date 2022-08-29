import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { deleteBlog, updateBlog } from '../../../features/blogsSlice'
import { setSnackbar } from '../../../features/snackbarSlice'

const Blog = ({ blog }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isUpdatingLikes, setIsUpdatingLikes] = useState(false)
  const [isRemovingBlog, setIsRemovingBlog] = useState(false)
  const dispatch = useDispatch()

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
      setIsVisible(false)
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
      setIsVisible(false)
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
      <h4 data-testid="blogHeading">
        {blog.title} {blog.author}
        <button
          onClick={() => setIsVisible((prev) => !prev)}
          data-testid="toggleDetailsButton"
        >
          {isVisible ? 'hide' : 'view'}
        </button>
      </h4>
      {isVisible && (
        <>
          <ul style={{ listStyle: 'none' }}>
            <li data-testid="blogUrl">{blog.url}</li>
            <li data-testid="blogLikes">
              {blog.likes}
              <button
                onClick={handleLike}
                disabled={isUpdatingLikes}
                data-testid="likeButton"
              >
                like
              </button>
            </li>
            <li data-testid="blogUserName">{blog.user.name}</li>
          </ul>
          <button
            onClick={handleRemove}
            disabled={isRemovingBlog}
            data-testid="deleteButton"
          >
            remove
          </button>
        </>
      )}
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
  }).isRequired,
}
export default Blog
