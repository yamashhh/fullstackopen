import { useEffect, useState } from "react";
import axios from "axios";

const useNotes = (url) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get(url);
      setNotes(response.data);
    })();
  }, []);

  return notes;
};

export default useNotes;
