import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { createSelector } from '@reduxjs/toolkit'

const User = () => {
  const { userId } = useParams()
  const user = useSelector(
    createSelector(
      (state) => state.users,
      (users) => users.find((user) => user.id === userId)
    )
  )

  return (
    <>
      <h2>added blogs</h2>
      <ul>
        {user?.blogs?.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default User
