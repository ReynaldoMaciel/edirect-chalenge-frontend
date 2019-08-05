const getters = {}

const state = {
  token: ''
}

const mutations = {
  SET_TOKEN (state, payload) {
    state.token = payload
  },
}

const actions = {
  deleteToken ({ commit }) {
    commit('SET_TOKEN', null)
  },
  setToken ({ commit }, payload) {
    commit('SET_TOKEN', payload)
  }
}

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions
}
