import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// Módulos do storage
import modules from './modules'

// Modulos de persistencia precisam ser importados um a um
import token from './modules/token'

Vue.use(Vuex)

// root state
const state = {}

// root mutations
const mutations = {}

// root actions
const actions = {}

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  strict: false,
  // Módulos que são usados pelo "vuex-persistedstate" precisam ser carregados previamente
  modules: {
    token,
  },
  plugins: [
    createPersistedState({
      paths: ['token']
    })
  ]
})

modules.forEach(path => {
  import(`@/store/modules/${path}`).then(storeModule => {
    store.registerModule(path, storeModule.default)
  })
})

export default store
