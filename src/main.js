import Vue from 'vue'
import store from './store'
import router from './router'
import Buefy from 'buefy'
import VeeValidate from 'vee-validate'
import VeeValidateDictionary from './validators/dictionary'

// CSS Buefy
import 'buefy/dist/buefy.css'

import App from './App.vue'

Vue.use(Buefy)
Vue.use(VeeValidate, {
  dictionary: VeeValidateDictionary,
  errorBagName: 'errors',
  events: 'input',
  fieldsBagName: 'fieldsVeeValidate'
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
