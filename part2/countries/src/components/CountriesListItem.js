const CountriesListItem = ({ country, onClick }) => (
  <li>
    {country.name.official}
    <button onClick={onClick}>show</button>
  </li>
);

export default CountriesListItem;
