import CountriesListItem from "./CountriesListItem";

const CountriesList = ({ countries, onClick }) => (
  <ul>
    {countries.map((country) => (
      <CountriesListItem
        key={country.latlng.toString()}
        country={country}
        onClick={() => onClick(country)}
      />
    ))}
  </ul>
);

export default CountriesList;
