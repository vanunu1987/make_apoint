import Vue from 'vue'
import Vuex from 'vuex'

import BusinessService from './services/BusinessService.js'
import AppointsService from './services/AppointsService.js'
import UserService from './services/UserService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    businessList: [],
    appointsList: [],
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
    filterBy(state){
      return state.filterBy
    }
  },

  mutations: {
    setCurrBusiness(state, { business }) {
      state.currBusiness = business
    },
    getBusinessList(state, payload) {
      state.businessList = payload.businessList
      state.filterBy = payload.filterBy
    },
    setLoc(state,{loc}){
      state.currBusiness.loc=loc
    },
    getAppointsList(state, {appointsList}) {
      state.appointsList = appointsList
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
    async loadBusinesses(context) {
      var filterBy = context.state.filterBy
      var businessList = await BusinessService.query(filterBy)
      context.commit({ type: 'getBusinessList', businessList, filterBy })
      console.log(businessList);
      return businessList
    },
    saveAdrres(context,{loc}){
      console.log(loc);
      context.commit({ type: 'setLoc', loc })
    },
    async loadAppoints(context) {
      var businessId = context.state.currBusiness._id
      var appointsList = await AppointsService.query(businessId)
      context.commit({ type: 'getAppointsList', appointsList})
      console.log(appointsList);
      return appointsList
    },
    async loginUser(context, {credentials}){
      console.log('dispatched : ',credentials);
      await UserService.checkLogin(credentials)

      
    }

  }

})
