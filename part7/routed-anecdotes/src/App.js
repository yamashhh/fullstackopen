import { useState } from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Menu from "./components/Menu";
import AnecdoteList from "./components/AnecdoteList";
import About from "./components/About";
import CreateNew from "./components/CreateNew";
import Footer from "./components/Footer";
import Anecdote from "./components/Anecdote";
import { useMatch } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Notification from "./components/Notification";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);
  const [notification, setNotification] = useState("");
  const navigate = useNavigate();

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    navigate("/");
    setNotification(`a new anecdote ${anecdote.content} created!`);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);
  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const match = useMatch("/anecdotes/:id");

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification
        notification={notification}
        setNotification={setNotification}
      />
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route
          path="/anecdotes/:id"
          element={
            <Anecdote anecdote={anecdoteById(Number(match?.params.id))} />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
