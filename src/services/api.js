import axios from 'axios'
import store from '../store'

let authorization = store.state.token.token ? store.state.token.token : null

let api = axios.create({
  baseURL: 'https://chalenge-edirect-backend.herokuapp.com/',
  timeout: 5000,
  headers: { authorization }
});

export default api