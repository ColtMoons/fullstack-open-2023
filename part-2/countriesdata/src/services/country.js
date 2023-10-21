import axios from "axios";

const getAllCountries = () => {
  return axios
    .get("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then((response) => response.data);
};

const getCountryByName = (name) => {
  return axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name.common}`)
    .then((response) => response.data);
};

const getWeatherByCountry = (lat, lng) => {
  return axios
    .get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&exclude=hourly,daily,minutely&units=metric&appid=${
        import.meta.env.VITE_WEATHER_KEY
      }
      `
    )
    .then((response) => response.data);
};

export default { getAllCountries, getCountryByName, getWeatherByCountry };
