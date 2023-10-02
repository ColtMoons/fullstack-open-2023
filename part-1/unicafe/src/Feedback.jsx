import Button from "./Button";

const Feedback = ({handleGood, handleNeutral, handleBad}) => {
  return (
    <>
      <h2>Give feedback</h2>
      <Button text={"good"} handleClick={handleGood} />
      <Button text={"neutral"} handleClick={handleNeutral} />
      <Button text={"bad"} handleClick={handleBad} />
    </>
  );
};

export default Feedback;
