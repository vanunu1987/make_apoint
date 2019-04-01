import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Details from './views/Details.vue'
import AddEdit from './views/AddEdit.vue'
import About from './views/About.vue'
import Login from './views/Login.vue'
// import BusinessManage from './views/BusinessManage.vue'
import BusinessPage from './views/BusinessPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/business/:businessId',
      name: 'business',
      component: Details

    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/edit/:businessId?',
      name: 'edit',
      component: AddEdit
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/manage/:businessId',
      name: 'BusinessPage',
      component: BusinessPage
    },
  ]
})
