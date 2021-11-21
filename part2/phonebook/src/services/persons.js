import axios from "axios";
const baseUrl = "/api/persons";

const getAll = async () => (await axios.get(baseUrl)).data;

const create = async (person) => (await axios.post(baseUrl, person)).data;

const update = async (person) =>
  (await axios.put(`${baseUrl}/${person.id}`, person)).data;

const deletePerson = async (id) => await axios.delete(`${baseUrl}/${id}`);

const personsService = {
  getAll,
  create,
  update,
  deletePerson,
};

export default personsService;
