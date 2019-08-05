import Vue from 'vue'
import store from './store'
import router from './router'
import Buefy from 'buefy'
import VeeValidate from 'vee-validate'
import VeeValidateDictionary from './validators/dictionary'

// CSS Buefy
import 'buefy/dist/buefy.css'
import '@mdi/font/css/materialdesignicons.css'

import App from './App.vue'

Vue.use(Buefy, {
  defaultIconPack: 'mdi'
})
Vue.use(VeeValidate, {
  dictionary: VeeValidateDictionary,
  errorBagName: 'errors',
  events: 'input',
  fieldsBagName: 'fieldsVeeValidate',
  // locale: 'pt_BR'
})

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
