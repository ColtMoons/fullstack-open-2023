import { useState } from "react";
import Anecdote from "./Anecdote";
import DayAnecdote from "./DayAnecdote";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState({});

  const handleRandomAnecdote = () => {
    const rand = Math.floor(Math.random() * anecdotes.length);
    setSelected(rand);
  };

  const handleVote = () => {
    const quantity = vote[selected] || 0;
    setVote({ ...vote, [selected]: quantity + 1 });
  };

  const favoriteId = () => {
    const index = Object.keys(vote);
    const favIndex = index.reduce((i, curr) => {
      return vote[curr] > vote[i] ? curr : i;
    }, 0);
    return favIndex;
  };

  return (
    <div>
      <h1>Anecdote</h1>
      <DayAnecdote
        handleRandomAnecdote={handleRandomAnecdote}
        handleVote={handleVote}
        vote={vote[selected]}
        anecdote={anecdotes[selected]}
      />

      <h2>Anecdote with most votes</h2>
      <Anecdote vote={vote[favoriteId()]} text={anecdotes[favoriteId()]} />
    </div>
  );
};

export default App;
