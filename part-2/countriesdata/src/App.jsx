import { useEffect, useState } from "react";
import countryService from "./services/country";
import Search from "./Search";
import Countries from "./Countries";
import Country from "./Country";
const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  //fetch all data
  useEffect(() => {
    countryService.getAllCountries().then((response) => {
      setCountries(response);
    });
  }, []);

  //filter all countries by searchterm
  const countriesFiltered = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Search term={searchTerm} setTerm={setSearchTerm} />
      {countriesFiltered.length !== 1 ? (
        <Countries countries={countriesFiltered} setCountry={setSearchTerm} />
      ) : (
        <Country country={countriesFiltered[0]} />
      )}
    </div>
  );
};

export default App;
