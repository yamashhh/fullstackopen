import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const response = await axios.post(baseUrl, { content, important: false })
  return response.data
}

const updateImportanceOf = async ({ id, important }) => {
  const response = await axios.patch(`${baseUrl}/${id}`, {
    important: !important,
  })
  return response.data
}

const notesService = { getAll, createNew, updateImportanceOf }

export default notesService
