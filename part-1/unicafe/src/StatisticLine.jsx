const StatisticLane = ({ text, value, isPercentage }) => {
  return (
    <p>
      {text}: {value}
      {isPercentage && "%"}
    </p>
  );
};

export default StatisticLane;
