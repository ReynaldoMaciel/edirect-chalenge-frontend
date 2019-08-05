import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Register = () => import('../components/register/Register')
const Login = () => import('../components/login/Login')
const Dashboard = () => import('../components/dashboard/Dashboard')

export default new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/register', name: 'cadastro', component: Register },
    { path: '/login', name: 'login', component: Login },
    { path: '/dashboard', name: 'dashboard', component: Dashboard }
  ]
})