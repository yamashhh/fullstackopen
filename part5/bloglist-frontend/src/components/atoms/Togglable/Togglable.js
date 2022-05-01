import { forwardRef, useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

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
      <button onClick={toggleVisibility} style={buttonStyle}>
        cancel
      </button>
    </>
  ) : (
    <button onClick={toggleVisibility} style={buttonStyle}>
      {buttonLabel}
    </button>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}
Togglable.displayName = 'Togglable'

export default Togglable
