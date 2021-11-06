import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("some error happened...");

  useEffect(() => {
    console.log("effect");
    const fetchData = async () => {
      // setNotes(await noteService.getAll());
      setNotes(
        (await noteService.getAll()).concat({
          id: 10000,
          content: "This note is not saved to server",
          date: "2019-05-30T17:30:31.098Z",
          important: true,
        })
      );
      console.log("promise fulfilled");
    };
    fetchData();
  }, []);

  console.log("render", notes.length, "notes");

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const addNote = async (event) => {
    event.preventDefault();
    const returnedNote = await noteService.create({
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    });
    setNotes((prev) => [...prev, returnedNote]);
    setNewNote("");
  };

  const toggleImportanceOf = async (id) => {
    const note = notes.find((n) => n.id === id);
    try {
      const returnedNote = await noteService.update(id, {
        ...note,
        important: !note.important,
      });
      setNotes((prev) =>
        prev.map((note) => (note.id === id ? returnedNote : note))
      );
    } catch (error) {
      error.request.status === 404 || error.response.status === 404
        ? setErrorMessage(
            `the note '${note.content}' was already deleted from the server`
          )
        : setErrorMessage(JSON.stringify(error));
      setTimeout(() => setErrorMessage(null), 5000);
      setNotes((prev) => prev.filter((n) => n.id !== id));
    }
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <button onClick={() => setShowAll((prev) => !prev)}>
        show {showAll ? "important" : "all"}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
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
      <Footer />
    </div>
  );
};

export default App;
