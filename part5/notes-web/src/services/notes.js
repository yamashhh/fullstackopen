import axios from "axios";
const baseUrl = "/api/notes";
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  return (await axios.get(baseUrl)).data;
};

const create = async (newObject) => {
  return (
    await axios.post(baseUrl, newObject, {
      headers: {
        Authorization: token,
      },
    })
  ).data;
};

const update = async (id, newObject) => {
  return (await axios.put(`${baseUrl}/${id}`, newObject)).data;
};

const noteService = {
  setToken,
  getAll,
  create,
  update,
};

export default noteService;
