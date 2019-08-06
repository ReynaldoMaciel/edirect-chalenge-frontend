import axios from 'axios'
import store from '../store'

const serviceApi = () => {
  let authorization = store.state.token.token ? store.state.token.token : ''
  let api = axios.create({
    baseURL: 'https://chalenge-edirect-backend.herokuapp.com/',
    // baseURL: 'http://localhost:3001/',
    timeout: 5000,
    headers: { authorization }
  })
  return api
}

export default serviceApi