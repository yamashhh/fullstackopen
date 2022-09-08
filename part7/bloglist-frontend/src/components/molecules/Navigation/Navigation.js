import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, NavLink } from 'react-router-dom'
import { logout } from '../../../features/userSlice'
import { Nav, UL } from './Navigation.styles'

const Navigation = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <Nav>
      <UL>
        <li>
          <NavLink to="/">blogs</NavLink>
        </li>
        <li>
          <NavLink to="/users">users</NavLink>
        </li>
      </UL>
      {user && (
        <>
          <p>{user?.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
        </>
      )}
    </Nav>
  )
}

export default Navigation
