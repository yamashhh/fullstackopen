import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import loginService from "./services/login";
import LoginForm from "./components/Form/LoginForm";
import NoteForm from "./components/Form/NoteForm";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("effect");
    const fetchData = async () => {
      setNotes(await noteService.getAll());
      console.log("promise fulfilled");
    };
    fetchData();
  }, []);

  useEffect(() => {
    const loggedNoteAppUserJSON =
      window.localStorage.getItem("loggedNoteAppUser");
    if (loggedNoteAppUserJSON) {
      const user = JSON.parse(loggedNoteAppUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

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

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedNoteAppUser", JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials", exception);
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user ? (
        <>
          <p>Logged in as {user.name}</p>
          <NoteForm
            addNote={addNote}
            newNote={newNote}
            setNewNote={setNewNote}
          />
        </>
      ) : (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )}
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
      <Footer />
    </div>
  );
};

export default App;
