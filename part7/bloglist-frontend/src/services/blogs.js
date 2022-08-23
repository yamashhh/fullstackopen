import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = (newToken) => {
  token = newToken
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog, {
    headers: { Authorization: `bearer ${token}` },
  })
  return response.data
}

const update = async (id, blog) => {
  const response = await axios.patch(`${baseUrl}/${id}`, blog, {
    headers: { Authorization: `bearer ${token}` },
  })
  return response.data
}

const deleteBlog = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: `bearer ${token}` },
  })
}

const blogService = { setToken, getAll, create, update, deleteBlog }

export default blogService
