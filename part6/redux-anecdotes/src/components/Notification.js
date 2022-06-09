import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { resetNotification } from '../features/notification/notificationSlice'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }

  const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(resetNotification())
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notification, dispatch])

  return notification && <div style={style}>{notification}</div>
}

export default Notification
