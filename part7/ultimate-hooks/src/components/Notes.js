import { useEffect } from "react";
import useField from "../hooks/useField";
import useResource from "../hooks/useResource";

const Notes = () => {
  const content = useField("text");
  const [notes, noteService] = useResource("http://localhost:3005/notes");

  useEffect(
    () => {
      (async () => {
        await noteService.getAll();
      })();
    },
    // NOTE:
    // only run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });
  };

  return (
    <>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}
    </>
  );
};

export default Notes;
