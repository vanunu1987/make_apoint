import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Details from './views/Details.vue'
import AddEdit from './views/AddEdit.vue'
import BusinessManage from './views/BusinessManage.vue'

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
      path: '/edit/:businessId?',
      name: 'edit',
      component: AddEdit
    },
    {
      path: '/manage/:businessId',
      name: 'BusinessPage',
      component: BusinessManage
    },
  ]
})
