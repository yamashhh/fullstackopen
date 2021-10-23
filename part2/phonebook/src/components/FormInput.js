const FormInput = ({ label, value, onChange }) => (
  <label style={{ display: "block" }}>
    {label} <input type="text" value={value} onChange={onChange} />
  </label>
);

export default FormInput;
