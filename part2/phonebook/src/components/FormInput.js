const FormInput = ({ label, type = "text", value, onChange }) => (
  <label style={{ display: "block" }}>
    {label} <input type={type} value={value} onChange={onChange} required />
  </label>
);

export default FormInput;
