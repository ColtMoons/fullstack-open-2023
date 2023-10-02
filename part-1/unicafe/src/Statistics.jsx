import StatisticLane from "./StatisticLine";

const Statistics = ({ good, bad, neutral }) => {
  const all = good + bad + neutral;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;
  return (
    <>
      <StatisticLane text={"Good"} value={good} />
      <StatisticLane text={"Neutral"} value={neutral} />
      <StatisticLane text={"Bad"} value={bad} />
      <StatisticLane text={"All"} value={all} />
      <StatisticLane text={"Average"} value={average} />
      <StatisticLane text={"Positive"} value={positive} isPercentage={true} />
    </>
  );
};

export default Statistics;
