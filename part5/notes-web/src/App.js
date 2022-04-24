import { useState, useEffect, useRef } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
import Notification from "./components/Notification";
import Footer from "./components/Footer";
import loginService from "./services/login";
import LoginForm from "./components/Form/LoginForm";
import NoteForm from "./components/Form/NoteForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);
  const [errorMessage, setErrorMessage] = useState(null);
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

  const noteFormTogglableRef = useRef();
  const createNote = async (note) => {
    const returnedNote = await noteService.create(note);
    setNotes((prev) => [...prev, returnedNote]);
    noteFormTogglableRef.current.toggleVisibility();
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

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem("loggedNoteAppUser", JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setErrorMessage("Wrong credentials", exception);
      setTimeout(() => setErrorMessage(null), 5000);
      throw exception;
    }
  };

  return (
    <>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user ? (
        <>
          <p>Logged in as {user.name}</p>
          <Togglable buttonLabel="new note" ref={noteFormTogglableRef}>
            <NoteForm createNote={createNote} />
          </Togglable>
        </>
      ) : (
        <Togglable buttonLabel="login">
          <LoginForm handleLogin={handleLogin} />
        </Togglable>
      )}
      <button
        onClick={() => setShowAll((prev) => !prev)}
        style={{ display: "block" }}
      >
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
    </>
  );
};

export default App;
