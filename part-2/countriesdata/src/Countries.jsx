const Countries = ({ countries, setCountry }) => {
  const handleShow = ({ name }) => {
    setCountry(name.common);
  };

  return (
    <div>
      {countries.length > 10
        ? "Too many matches specify another filter"
        : countries.map((country) => (
            <div key={country.name.common}>
              {country.name.common}
              <button onClick={() => handleShow(country)}>Show</button>
            </div>
          ))}
    </div>
  );
};

export default Countries;
