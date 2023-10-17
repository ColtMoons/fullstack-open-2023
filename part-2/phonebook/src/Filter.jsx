const Filter = ({filter, handleChange}) => {
  return (
    <div>
      filter show with <input value={filter} onChange={handleChange} />
    </div>
  );
}

export default Filter;