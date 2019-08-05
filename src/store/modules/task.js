import { getField, updateField } from 'vuex-map-fields'

const getters = {
  notDone: state => idProject => state.listTasks.filter(task => !task.finishDate && task.idProject === idProject),
  done: state => idProject => state.listTasks.filter(task => task.finishDate && task.idProject === idProject),
  getField
}

const state = {
  listTasks: [],
  idTask: '',
  idProject: '',
  description: '',
  creationDate: '',
  finishDate: ''
}

const mutations = {
  ADD_TASK (state, payload) {
    state.listTasks = [...state.listTasks, payload]
  },
  ADD_TASKS (state, payload) {
    state.listTasks = [...state.listTasks, ...payload]
  },
  UPDATE_TASK (state, payload) {
    state.listTasks.forEach((task, i) => {
      if (task.idTask === payload.idTask) {
        state.listTasks[i] = {
          ...state.listTasks[i],
          ...payload
        }
      }
    })
  },
  REMOVE_TASK (state, payload) {
    state.listTasks = payload
  },
  REMOVE_ALL_TASKS (state, payload) {
    state.listTasks = []
  },
  REMOVE_ALL_TASKS_BY_PROJECT (state, payload) {
    state.listTasks = state.listTasks.filter(task => task.idProject !== payload)
  },
  updateField
}

const actions = {
  addTask ({ commit }, payload) {
    commit('ADD_TASK', payload)
  },
  addTasks ({ commit }, payload) {
    commit('ADD_TASKS', payload)
  },
  updateTask ({ commit }, payload) {
    commit('UPDATE_TASK', payload)
  },
  deleteTask ({ commit }, payload) {
    commit('UPDATE_TASK', payload)
  },
  removeAllTasks ({ commit }) {
    commit('REMOVE_ALL_TASKS')
  },
  removeAllTasksByProject ({ commit }, payload) {
    commit('REMOVE_ALL_TASKS_BY_PROJECT', payload)
  }
}

export default {
  namespaced: true,
  getters,
  state,
  mutations,
  actions
}
