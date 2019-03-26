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
    currBusiness: null,
    appointsList:[],
    imgList:[],
    BusinessTypes:['Barber','Tattoo Artist','Cosmetics'],
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
    loggedInUser(state) {
      return state.loggedInUser
    },
    appointsList(state){
      return state.appointsList
    },
    BusinessTypes(state){
      return state.BusinessTypes
    },
    imgList(state){
      return state.imgList
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

    setLoc(state, { loc }) {
      state.currBusiness.location = loc

    },
    getAppointsList(state, { appointsList }) {
      state.appointsList = appointsList
    },
    setLoggedInUser(state, { user }) {
      console.log('setLoggedInUser activated!', user)
      state.loggedInUser = user
    },
    setImgList(state,{imgList}){
      state.imgList = imgList
    }

  },
  actions: {
    async loadBusiness(context, { businessId }) {
      console.log('got id :: ',businessId);
      var business = await BusinessService.getById(businessId)
      context.commit({
        type: 'setCurrBusiness',
        business
      })
      return
    },
    async loadBusinesses(context, { filterBy }) {
      var businessList = await BusinessService.query(filterBy)
      context.commit({ type: 'getBusinessList', businessList, filterBy })
      return businessList
    },

    saveAddress(context, { loc }) {
      context.commit({ type: 'setLoc', loc })
    },
    async loadAppoints(context,{listRequire}) {
      console.log(listRequire);
      var user = context.getters.loggedInUser;
      if (!user) return
      var listRequireId = (listRequire === 'business') ? context.getters.currBusiness._id : context.getters.loggedInUser._id
      var appointsList = await AppointsService.query(listRequireId)
      context.commit({ type: 'getAppointsList', appointsList })
      console.log(appointsList);
      return appointsList
    },
    // async loadUserAppoints(context) {
    //   var user = context.getters.loggedInUser;
    //   if (!user) return
    //  var userId = user._id;
    //  var appointsList = await AppointsService
    // },
    async loginUser(context, { credentials }) {
      var user = await UserService.checkLogin(credentials)
      if (!user) return
      if (user.business_id) context.dispatch({type:'loadBusiness',businessId:user.business_id})
      context.commit({ type: 'setLoggedInUser', user })
      context.dispatch({type:'loadAppoints',listRequire:'user'})
    },

    async signUpUser(context, { credentials, isNewBusiness }) {
      var user = await UserService.signUpUser(credentials)
      if (!user) return
      context.commit({ type: 'setLoggedInUser', user })
      var currBusiness = context.getters.currBusiness
      if (isNewBusiness) BusinessService.add(currBusiness)
      .then ((res) => {
        user.business_id = res._id
        UserService.updateUser(user)
      })
    },

    async setCurrBusiness(context, { currBusiness }) {
      context.commit({ type: 'setCurrBusiness', business: currBusiness })
    },

    async loadImgs(context, { Businesstype }){
      var imgList = await BusinessService.getImgs(Businesstype)
      console.log('gotitititiitit : ',imgList);
      context.commit({ type: 'setImgList', imgList })
      
    },

    async loadBusinessData(context){
      var businessId = context.getters.currBusiness._id
      var businessData = await BusinessService.getData(businessId)

    }
  }

})
