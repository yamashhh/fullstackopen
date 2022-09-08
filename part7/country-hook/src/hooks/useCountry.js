import { useState, useEffect } from "react";
import axios from "axios";

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(
          `https://restcountries.com/v3.1/name/${name}?fullText=true`
        );
        setCountry(result.data?.[0]);
      } catch {
        setCountry(null);
      }
    })();
  }, [name]);

  return country;
};

export default useCountry;
