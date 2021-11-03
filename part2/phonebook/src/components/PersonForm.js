import FormInput from "./FormInput";

const PersonForm = ({
  onSubmit,
  name,
  onNameChange,
  number,
  onNumberChange,
}) => (
  <form onSubmit={onSubmit}>
    <FormInput label="name:" value={name} onChange={onNameChange} />
    <FormInput
      label="number:"
      type="tel"
      value={number}
      onChange={onNumberChange}
    />
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
