import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`
      );
      setWeather(data);
    };
    fetchData();
  }, [capital]);

  return capital && weather ? (
    <>
      <h2>Weather in {capital}</h2>
      <h3 style={{ display: "inline" }}>temperature: </h3>
      <span>{weather.current.temperature} Celsius</span>
      <img
        src={weather.current.weather_icons[0]}
        alt={`icon describing weather in ${capital}, currently ${weather.current.weather_descriptions[0]}`}
        style={{
          width: "200px",
          height: "200px",
          objectFit: "contain",
          display: "block",
        }}
      />
      <h3 style={{ display: "inline" }}>wind: </h3>
      <span>
        {weather.current.wind_speed} km/h direction {weather.current.wind_dir}
      </span>
    </>
  ) : capital ? (
    <h2>loading weather in {capital}</h2>
  ) : null;
};

export default Weather;
