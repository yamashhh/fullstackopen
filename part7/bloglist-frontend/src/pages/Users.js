import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import usersService from '../services/users'

const Users = () => {
  const [users, setUsers] = useState()
  useEffect(() => {
    ;(async () => {
      const users = await usersService.getAll()
      setUsers(users)
    })()
  }, [])

  console.log(users)

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th />
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  )
}

export default Users
