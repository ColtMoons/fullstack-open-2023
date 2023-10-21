const Search =({term, setTerm}) => {
  const handleChange = ({target}) => {
    setTerm(target.value);
  }

  return (
    <div>
      find countries <input type="text" value={term} onChange={handleChange}/>
    </div>
  )
}

export default Search;