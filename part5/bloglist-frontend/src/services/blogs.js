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

const blogService = { setToken, getAll, create }

export default blogService
