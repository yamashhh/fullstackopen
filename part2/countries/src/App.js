import { useState, useEffect } from "react";
import Country from "./Country";
import axios from "axios";
import CountriesList from "./CountriesList";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [country, setCountry] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(data);
    };
    fetchData();
  }, []);

  const filterCountries = (event) => {
    if (!event.target.value) {
      setFilteredCountries([]);
      setCountry(undefined);
      return;
    }
    const regex = new RegExp(event.target.value, "i");
    setFilteredCountries(
      countries.filter(
        (country) =>
          regex.test(country.name.common) || regex.test(country.name.official)
      )
    );
  };

  useEffect(() => {
    if (filteredCountries.length === 1) setCountry(filteredCountries[0]);
    if (!filteredCountries.length || filteredCountries.length > 1)
      setCountry(undefined);
  }, [filteredCountries]);

  return (
    <>
      <label>
        find countries <input type="text" onChange={filterCountries} />
      </label>
      {filteredCountries.length === 1 ? undefined : filteredCountries.length >
          1 && filteredCountries.length <= 10 ? (
        <CountriesList
          countries={filteredCountries}
          onClick={(country) => setCountry(country)}
        />
      ) : filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        <p>Country not found</p>
      )}
      {country && <Country country={country} />}
    </>
  );
};

export default App;
