import axios from 'axios'

let api = axios.create({
  baseURL: 'https://chalenge-edirect-backend.herokuapp.com/',
  timeout: 5000
});

export default api