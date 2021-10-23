import PersonFormInput from "./PersonFormInput";

const PersonForm = ({
  onSubmit,
  name,
  onNameChange,
  number,
  onNumberChange,
}) => (
  <form onSubmit={onSubmit}>
    <PersonFormInput label="name" value={name} onChange={onNameChange} />
    <PersonFormInput label="number" value={number} onChange={onNumberChange} />
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
