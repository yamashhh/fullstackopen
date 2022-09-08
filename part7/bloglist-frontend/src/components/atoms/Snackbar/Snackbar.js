import { useSelector } from 'react-redux'
import { Wrapper } from './Snackbar.styles'

const Snackbar = () => {
  const { message, isError } = useSelector((state) => state.snackbar)

  return (
    message && (
      <Wrapper isError={isError} data-testid="snackbar">
        {message}
      </Wrapper>
    )
  )
}

export default Snackbar
