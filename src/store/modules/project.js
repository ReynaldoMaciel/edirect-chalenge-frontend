import { getField, updateField } from 'vuex-map-fields'

const getters = {
  getField
}

const state = {
  listProjects: [],
  idProject: '',
  name: ''
}

const mutations = {
  SET_ID_PROJECT (state, payload) {
    state.idProject = payload
  },
  ADD_PROJECT (state, payload) {
    state.listProjects = [...state.listProjects, payload]
  },
  ADD_PROJECTS (state, payload) {
    state.listProjects = [...state.listProjects, ...payload]
  },
  UPDATE_PROJECT (state, payload) {
    state.listProjects.forEach((project, i) => {
      if (project.idProject === payload.idProject) {
        state.listProjects[i] = {
          ...state.listProjects[i],
          ...payload
        }
      }
    })
  },
  REMOVE_PROJECT (state, payload) {
    let projectIndex = state.listProjects.findIndex(project => project.idProject === payload.idProject)
    state.listProjects.splice(projectIndex, 1)
  },
  REMOVE_ALL_PROJECTS (state, payload) {
    state.listProjects = []
  },
  updateField
}

const actions = {
  addProject ({ commit }, payload) {
    commit('ADD_PROJECT', payload)
  },
  setIdProject({ commit }, payload) {
    commit('SET_ID_PROJECT', payload)
  },
  addProjects ({ commit }, payload) {
    commit('ADD_PROJECTS', payload)
  },
  updateProject ({ commit }, payload) {
    commit('UPDATE_PROJECT', payload)
  },
  removeProject ({ commit }, payload) {
    commit('REMOVE_PROJECT', payload)
  },
  removeAllProjects ({ commit }) {
    commit('REMOVE_ALL_PROJECTS')
  }
}

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions
}
