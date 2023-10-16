const Total = ({ parts }) => {
  const total = parts.reduce((accum, current) => accum + current.exercises, 0);
  return <strong>Number of exercises {total} </strong>;
};

export default Total;
