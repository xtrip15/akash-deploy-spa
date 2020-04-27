import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../index.vue'
import Assembly from '../views/assembly.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/assembly',
    name: 'assembly',
    component: Assembly
  }
]

const router = new VueRouter({
  routes
})

export default router
