import { useEffect, useState } from "react";
import { createNote, getAllNotes } from "./noteService";
import { type Note } from "./types";

const App = (): JSX.Element => {
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    void (async () => {
      const notes = await getAllNotes();
      setNotes(notes);
    })();
  }, []);

  return (
    <>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const note = await createNote({ content: newNote });
          setNotes((notes) => notes.concat(note));
          setNewNote("");
        }}
      >
        <input
          type="text"
          value={newNote}
          onChange={(event) => {
            setNewNote(event.target.value);
          }}
        />
        <button type="submit">add</button>
      </form>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </>
  );
};

export default App;
