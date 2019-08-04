import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Register = () => import('../components/register/Register')
const Login = () => import('../components/login/Login')

export default new VueRouter({
  mode: 'history',
  routes: [
    { path: '/register', name: 'cadastro', component: Register },
    { path: '/login', name: 'login', component: Login }
  ]
})