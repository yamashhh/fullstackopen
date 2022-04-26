import { useState } from 'react'

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
      <h4>
        {blog.title} {blog.author}
        <button onClick={() => setIsVisible((prev) => !prev)}>
          {isVisible ? 'hide' : 'view'}
        </button>
      </h4>
      {isVisible && (
        <>
          <ul style={{ listStyle: 'none' }}>
            <li>{blog.url}</li>
            <li>
              {blog.likes}{' '}
              <button onClick={handleLike} disabled={isUpdatingLikes}>
                like
              </button>
            </li>
            <li>{blog.user.name}</li>
          </ul>
          <button onClick={handleRemove} disabled={isRemovingBlog}>
            remove
          </button>
        </>
      )}
    </article>
  )
}

export default Blog
