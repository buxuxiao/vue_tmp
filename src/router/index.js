import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import VacationAdd from '../vacation/add/VacationAdd.vue'
import VacationList from '../vacation/list/VacationList'
import VacationDetail from '../vacation/detail/VacationDetail'
import SelectPeople from '../util/SelectPeople'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/add',
    name: 'Add',
    component: VacationAdd
  },
  {
    path: '/list',
    name: 'List',
    component: VacationList
  },
  {
    path: '/detail',
    name: 'Detail',
    component: VacationDetail
  },
  {
    path: '/people',
    name: 'SelectPeople',
    component: SelectPeople
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
