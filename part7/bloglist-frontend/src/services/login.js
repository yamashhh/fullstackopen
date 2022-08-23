import axios from 'axios'
const baseUrl = '/api/login'

const login = async (credentials) => {
  const request = await axios.post(baseUrl, credentials)
  return request.data
}

const loginService = { login }

export default loginService
