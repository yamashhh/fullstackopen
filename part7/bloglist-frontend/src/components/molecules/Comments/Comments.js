import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../../../features/blogsSlice'
import { setSnackbar } from '../../../features/snackbarSlice'

const Comments = ({ blog }) => {
  const [comment, setComment] = useState('')
  const [isCommenting, setIsCommenting] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      setIsCommenting(true)
      await dispatch(commentBlog({ id: blog.id, comment })).unwrap()
      dispatch(
        setSnackbar({
          message: `added comment to blog ${blog.title}`,
          isError: false,
        })
      )
      setComment('')
    } catch (error) {
      dispatch(
        setSnackbar({
          message: error?.message,
          isError: true,
        })
      )
    } finally {
      setIsCommenting(false)
    }
  }

  return (
    <>
      <h3>comments</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button type="submit" disabled={isCommenting}>
          add comment
        </button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={comment._id}>{comment.comment}</li>
        ))}
      </ul>
    </>
  )
}

export default Comments
