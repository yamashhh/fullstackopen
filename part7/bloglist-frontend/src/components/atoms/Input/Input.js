import { Label, StyledInput } from './Input.styles'

const Input = ({ label, type = 'text', value, setValue, testId = '' }) => {
  return (
    <Label>
      {label}
      <StyledInput
        type={type}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        data-testid={testId}
      />
    </Label>
  )
}

export default Input
