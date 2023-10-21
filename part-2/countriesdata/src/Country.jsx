import { useEffect, useState } from "react";
import countryService from './services/country'
const Country = ({ country }) => {

  const [weather, setWeather] = useState(null);

  useEffect(()=> {
    const [lat, lng] = country.capitalInfo.latlng;
    countryService.getWeatherByCountry(lat, lng).then(response => setWeather(response))
  }, [country.capitalInfo.latlng])

  if(!weather){
    return <p>Loading ...</p>
  }

  const languages = Object.values(country.languages);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h2>Languages:</h2>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.name.common + " flag"} />
      <h2>Weather in {country.capital}</h2>
      <p>Temperature {weather.current.temp} Celcius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`} />
      <p>Wind {weather.current.wind_speed}m/s</p>
    </div>
  );
};

export default Country;
