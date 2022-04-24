import { useState } from "react";

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState("");
  const addNote = (event) => {
    event.preventDefault();
    createNote({
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
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
        type="text"
        value={newNote}
        onChange={(event) => setNewNote(event.target.value)}
      />
      <button type="submit">save</button>
    </form>
  );
};

export default NoteForm;
