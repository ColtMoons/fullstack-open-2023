import { useState } from "react";
import Feedback from "./Feedback";
import Statistics from "./Statistics";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const isFeedback = good || neutral || bad;

  console.log(isFeedback);

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);
  return (
    <div>
      <h1>Unicafe</h1>
      <Feedback
        handleGood={handleGood}
        handleNeutral={handleNeutral}
        handleBad={handleBad}
      />
      <h2>Statistics</h2>
      {isFeedback ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <p>Not feedback given</p>
      )}
    </div>
  );
};

export default App;
