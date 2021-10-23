import { useState } from "react";
import Note from "./components/Note";

const App = ({ notes: propsNotes }) => {
  const [notes, setNotes] = useState(propsNotes);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const addNote = (event) => {
    event.preventDefault();
    setNotes((prev) => [
      ...prev,
      {
        content: newNote,
        date: new Date().toISOString(),
        important: Math.random() < 0.5,
        id: prev.length + 1,
      },
    ]);
    setNewNote("");
  };

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll((prev) => !prev)}>
        show {showAll ? "important" : "all"}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input
          type="text"
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)}
        />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
