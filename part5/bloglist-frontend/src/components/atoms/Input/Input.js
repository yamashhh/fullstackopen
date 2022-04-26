const Input = ({ label, type = 'text', value, setValue }) => {
  return (
    <label>
      {label}
      <input
        type={type}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </label>
  )
}

export default Input
