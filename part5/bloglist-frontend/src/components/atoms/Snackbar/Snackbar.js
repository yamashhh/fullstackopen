import './Snackbar.css'

const Snackbar = ({ message, isError }) => {
  return (
    <div
      className={`snackbar${isError ? ' -error' : ''}`}
      data-testid="snackbar"
    >
      {message}
    </div>
  )
}

export default Snackbar
