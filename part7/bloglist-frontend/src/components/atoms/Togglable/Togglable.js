import { forwardRef, useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Button } from '../Button/Button.styles'

const Togglable = forwardRef(({ children, buttonLabel }, ref) => {
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => {
    setIsVisible((previous) => !previous)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  const buttonStyle = { display: 'block' }

  return isVisible ? (
    <>
      {children}
      <Button onClick={toggleVisibility} style={buttonStyle}>
        cancel
      </Button>
    </>
  ) : (
    <Button onClick={toggleVisibility} style={buttonStyle}>
      {buttonLabel}
    </Button>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}
Togglable.displayName = 'Togglable'

export default Togglable
