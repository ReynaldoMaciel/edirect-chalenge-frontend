const getters = {
  token_expired: (state) => {
    const createdDate = new Date(state.created_date)
    const expirationDate = new Date()
    /* Tempo de expiração do token: 24 horas */
    expirationDate.setDate(expirationDate.getDate() - 1)
    return createdDate.getTime() < expirationDate.getTime()
  }
}

const state = {
  token: null,
  created_date: null
}

const mutations = {
  SET_TOKEN (state, payload) {
    state.token = payload
  },
  SET_DATE_TOKEN (state, payload) {
    state.created_date = payload
  }
}

const actions = {
  deleteToken ({ commit }) {
    commit('SET_TOKEN', null)
  },
  setDateToken ({ commit }, payload) {
    commit('SET_DATE_TOKEN', payload)
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
