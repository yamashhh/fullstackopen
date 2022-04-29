import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleUpdate, handleDelete }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isUpdatingLikes, setIsUpdatingLikes] = useState(false)
  const [isRemovingBlog, setIsRemovingBlog] = useState(false)

  const handleLike = async () => {
    try {
      setIsUpdatingLikes(true)
      await handleUpdate(blog.id, { likes: blog.likes + 1 })
      setIsVisible(false)
    } finally {
      setIsUpdatingLikes(false)
    }
  }

  const handleRemove = async () => {
    try {
      setIsRemovingBlog(true)
      await handleDelete(blog)
      setIsVisible(false)
    } finally {
      setIsRemovingBlog(false)
    }
  }

  return (
    <article>
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
          <button onClick={handleRemove} disabled={isRemovingBlog}>
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
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}
export default Blog
