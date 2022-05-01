const Input = ({ label, type = 'text', value, setValue, testId = '' }) => {
  return (
    <label>
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        data-testid={testId}
      />
    </label>
  )
}

export default Input
