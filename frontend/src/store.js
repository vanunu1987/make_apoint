import Vue from 'vue'
import Vuex from 'vuex'

import BusinessService from './services/BusinessService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    businessList: [],
    currBusiness: {},
    filterBy: {
      name: '',
      sortBy: ''
    },
  },
  getters: {
    businessList(state) {
      return state.businessList
    },
    currBusiness(state) {
      return state.currBusiness
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
    }

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
    }

  }

})
