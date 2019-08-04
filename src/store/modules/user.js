import { getField, updateField } from 'vuex-map-fields'
const state = () => {
  return {
    name: '',
    email: '',
    password: '',
    confirmation_password: ''
  }
}

// const mutations = {}

// const actions = {}

export default {
  namespaced: true,
  state: state,
  mutations: {
    updateField
  },
  getters: {
    getField
  }
}
