import Weather from "./Weather";

const Country = ({ country }) => {
  const capitalArray = country?.capital ?? [];
  const capital = capitalArray.length ? capitalArray[0] : "";

  return (
    <>
      <h1>{country.name.official}</h1>
      <p>capital {capital || "Capital data not found."}</p>
      <p>population {country.population}</p>
      <h2>Spoken languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        src={country.flags.svg}
        alt={`flag of ${country.name.common}`}
        style={{ width: "400px", height: "400px", objectFit: "contain" }}
      />
      <Weather capital={capital} />
    </>
  );
};

export default Country;
