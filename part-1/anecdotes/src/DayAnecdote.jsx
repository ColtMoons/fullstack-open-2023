import Anecdote from "./Anecdote";
import Button from "./Button";

const DayAnecdote = ({ handleRandomAnecdote, handleVote, anecdote, vote }) => {
  return (
    <>
      <h2>Anecdote of the day</h2>
      <Anecdote vote={vote} text={anecdote} />
      <Button handleClick={handleRandomAnecdote} text={"next anecdote"} />
      <Button handleClick={handleVote} text={"vote"} />
    </>
  );
};

export default DayAnecdote;
