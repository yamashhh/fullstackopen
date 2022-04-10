import './Snackbar.css'

const Snackbar = ({ message, isError }) => {
  return <div className={`snackbar${isError ? ' -error' : ''}`}>{message}</div>
}

export default Snackbar
