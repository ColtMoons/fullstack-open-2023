const Statistics = ({good, bad, neutral}) => {
  const all = good + bad + neutral;
  const average = (good - bad) / all;
  const positive = good / all * 100;  
  return (
    <>
      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>all: {all} </p>
      <p>average: {average || 0}</p>
      <p>positive: {positive} %</p>
    </>
  );
}

export default Statistics;