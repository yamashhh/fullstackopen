import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import usersService from '../services/users'

const User = () => {
  const [users, setUsers] = useState()
  useEffect(() => {
    ;(async () => {
      const users = await usersService.getAll()
      setUsers(users)
    })()
  }, [])
  const { userId } = useParams()
  const user = users?.find((user) => user.id === userId)

  return (
    <>
      <h2>added blogs</h2>
      <ul>{user && user.blogs.map((blog) => <li>{blog.title}</li>)}</ul>
    </>
  )
}

export default User
