import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const Register = () => import('../components/register/Register')
const Login = () => import('../components/login/Login')
const Dashboard = () => import('../components/dashboard/Dashboard')

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/register', name: 'register', component: Register },
    { path: '/login', name: 'login', component: Login },
    { path: '/dashboard', name: 'dashboard', component: Dashboard }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.name
  if (!store.state.token.token) {
    if (to.name !== 'login' && to.name !== 'register') {
      router.replace({ name: 'login' })
    }
  }
  next()
})

export default router