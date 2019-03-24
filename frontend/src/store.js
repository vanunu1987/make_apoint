import Vue from 'vue'
import Vuex from 'vuex'

import BusinessService from './services/BusinessService.js'
import AppointsService from './services/AppointsService.js'
import UserService from './services/UserService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    businessList: [],
    loggedInUser: null,
    currBusinessAppoints: [],
    currBusiness: {},
    filterBy: {
      name: '',
      type: '',
      sortBy: '',
      currUserLocation: { lat: 32.087971200000005, lng: 34.8031581 },
    },
  },
  getters: {
    businessList(state) {
      return state.businessList
    },
    currBusiness(state) {
      return state.currBusiness
    },
    filterBy(state) {
      return state.filterBy
    },
    loggedInUser(state){
      return state.loggedInUser
    }
  },

  mutations: {
    setCurrBusiness(state, { business }) {
      state.currBusiness = business
      console.log(state.currBusiness);
      
    },
    getBusinessList(state, payload) {
      state.businessList = payload.businessList
      state.filterBy = payload.filterBy
    },

    setLoc(state,{loc}){
      state.currBusiness.location=loc

    },
    getAppointsList(state, { appointsList }) {
      state.appointsList = appointsList
    },
    setLoggedInUser(state, { user }) {
      console.log('setLoggedInUser activated!',user)
      state.loggedInUser = user
    },

  },
  actions: {
    async loadBusiness(context, { businessId }) {
      var business = await BusinessService.getById(businessId)
      context.commit({
        type: 'setCurrBusiness',
        business
      })
      return
    },
    async loadBusinesses(context , {filterBy}) {
      console.log(filterBy);
      
      // var filterBy = context.state.filterBy
      var businessList = await BusinessService.query(filterBy)
      context.commit({ type: 'getBusinessList', businessList, filterBy })
      console.log(businessList);
      return businessList
    },

    saveAddress(context,{loc}){

      console.log(loc);
      context.commit({ type: 'setLoc', loc })
    },
    async loadAppoints(context) {
      var businessId = context.state.currBusiness._id
      var appointsList = await AppointsService.query(businessId)
      context.commit({ type: 'getAppointsList', appointsList })
      console.log(appointsList);
      return appointsList
    },
    async loginUser(context, { credentials }) {
      console.log('dispatched : ', credentials);
      var user = await UserService.checkLogin(credentials)
      console.log('user:', user)
      if (!user) return
      context.commit({type:'setLoggedInUser',user})
    },

    async signUpUser(context, { credentials }) {
      console.log('dispatched : ', credentials);
      var user = await UserService.signUpUser(credentials)
      console.log('user:', user)
      if (!user) return
      context.commit({type:'setLoggedInUser',user})
    },

    async setCurrBusiness(context,{currBusiness}){
      context.commit({type:'setCurrBusiness',business:currBusiness})

    }

  }

})
