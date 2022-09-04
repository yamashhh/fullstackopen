import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, NavLink } from 'react-router-dom'
import { logout } from '../../../features/userSlice'
import './Navigation.css'

const Navigation = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <nav className="app-navigation">
      <ul className="list">
        <li>
          <NavLink to="/">blogs</NavLink>
        </li>
        <li>
          <NavLink to="/users">users</NavLink>
        </li>
      </ul>
      {user && (
        <>
          <p>{user?.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
        </>
      )}
    </nav>
  )
}

export default Navigation
