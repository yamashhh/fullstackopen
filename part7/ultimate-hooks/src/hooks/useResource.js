import axios from "axios";
import { useState } from "react";

const useResource = (url) => {
  const [resources, setResources] = useState([]);

  const getAll = async () => {
    const response = await axios.get(url);
    setResources(response.data);
  };

  const create = async (resource) => {
    const response = await axios.post(url, resource);
    setResources((previous) => [...previous, response.data]);
  };

  const service = {
    getAll,
    create,
  };

  return [resources, service];
};

export default useResource;
