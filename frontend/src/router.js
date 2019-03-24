import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Details from './views/Details.vue'
import Edit from './views/Edit.vue'
import About from './views/About.vue'

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
      path: '/edit',
      name: 'edit',
      component: Edit
    }
  ]
})
