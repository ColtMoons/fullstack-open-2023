const Anecdote = ({vote, text}) => {
  return (
    <>
      <p>{text}</p>
      <p>Has {vote || 0} votes</p>
    </>
  );
}

export default Anecdote;