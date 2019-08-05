import axios from 'axios'
import store from '../store'

let authorization = store.state.token.token ? store.state.token.token : null

let api = axios.create({
  baseURL: 'http://localhost:3001/',
  timeout: 5000,
  headers: { authorization }
});

export default api