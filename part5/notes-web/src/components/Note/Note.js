const Note = ({ note, toggleImportance }) => {
  const label = note.important ? "make not important" : "make important";

  return (
    <li className="note">
      <i>{note.content}</i>
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

export default Note;
