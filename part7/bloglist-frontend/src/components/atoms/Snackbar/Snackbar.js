import './Snackbar.css'
import { useSelector } from 'react-redux'

const Snackbar = () => {
  const { message, isError } = useSelector((state) => state.snackbar)

  return (
    message && (
      <div
        className={`snackbar${isError ? ' -error' : ''}`}
        data-testid="snackbar"
      >
        {message}
      </div>
    )
  )
}

export default Snackbar
