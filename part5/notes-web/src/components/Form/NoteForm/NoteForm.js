import { useState } from "react";

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState("");
  const addNote = (event) => {
    event.preventDefault();
    createNote({
      content: newNote,
      date: new Date().toISOString(),
      important: false,
    });
    setNewNote("");
  };

  return (
    <form
      onSubmit={addNote}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <h2>Create a new note</h2>
      <input
        data-testid="noteInput"
        type="text"
        value={newNote}
        onChange={(event) => setNewNote(event.target.value)}
      />
      <button type="submit" data-testid="saveButton">
        save
      </button>
    </form>
  );
};

export default NoteForm;
