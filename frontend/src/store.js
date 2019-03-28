import Vue from 'vue'
import Vuex from 'vuex'

import BusinessService from './services/BusinessService.js'
import AppointsService from './services/AppointsService.js'
import UserService from './services/UserService.js'
import { stat } from 'fs';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    businessList: [],
    loggedInUser: null,
    currBusiness: null,
    appointsList:[],
    userAppointsList:[],
    imgList:[],
    businessData:null,
    BusinessTypes:['Barber','Tattoo Artist','Cosmetics'],
    filterBy: {
      name: '',
      type: '',
      sortBy: '',
      currUserLocation: { lat: 32.087971200000005, lng: 34.8031581 },
    },
    currUserLocation:null
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
    userAppointsList(state){
      return state.userAppointsList
    },
    BusinessTypes(state){
      return state.BusinessTypes
    },
    imgList(state){
      return state.imgList
    },
    businessData(state){
      return state.businessData
    },
    currUserLocation(state){
      return state.currUserLocation
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
    getUserAppointsList(state, { appointsList }) {
      state.userAppointsList = appointsList
    },
    setLoggedInUser(state, { user }) {
      console.log('setLoggedInUser activated!', user)
      state.loggedInUser = user
    },
    setImgList(state,{imgList}){
      state.imgList = imgList
    },
    setBusinessData(state,{businessData}){
      state.businessData = businessData
    },
    updateUser(state,{user}){
      state.loggedInUser = user
    },
    setCurrUserLocation(state,{userLocation}){
      state.currUserLocation = userLocation
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
      var user = context.getters.loggedInUser;
      if (!user || listRequire === 'business'){
        var listRequireId = context.getters.currBusiness._id
        var filterBy = {listRequire,listRequireId}
        var appointsList = await AppointsService.query(filterBy)
        context.commit({ type: 'getAppointsList', appointsList })
        return appointsList
      } else {
        var listRequireId = context.getters.loggedInUser._id
        var filterBy = {listRequire,listRequireId}
        var appointsList = await AppointsService.query(filterBy)
        context.commit({ type: 'getUserAppointsList', appointsList })
        return appointsList
      }
    },
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
      var currBusiness = context.getters.currBusiness
      if (isNewBusiness){
        BusinessService.add(currBusiness)
        .then ((res) => {
          user.business_id = res._id
          UserService.updateUser(user)
          context.commit({ type: 'setLoggedInUser', user })
          context.commit({ type: 'setCurrBusiness', business: res })
          return res
        }) 
      }
      else {
        context.commit({ type: 'setLoggedInUser', user })
        // context.commit({ type: 'setCurrBusiness', business: res })
        return
      } 
    },

    async setCurrBusiness(context, { currBusiness }) {
     await context.commit({ type: 'setCurrBusiness', business: currBusiness })
     return
    },

    async loadImgs(context, { Businesstype }){
      var imgList = await BusinessService.getImgs(Businesstype)
      console.log('gotitititiitit : ',imgList);
      context.commit({ type: 'setImgList', imgList })
      
    },

    async loadBusinessData(context){
      var businessId = context.getters.currBusiness._id
      var businessData = await AppointsService.getBusinessData(businessId)
      context.commit({ type: 'setBusinessData', businessData })
    },

    async addBusiness(context , {currBusiness}){
      var businessId = currBusiness._id
      if (!businessId){
        var business = await BusinessService.add(currBusiness)
        var user = context.getters.loggedInUser
        user._businessId = business._id
        UserService.updateUser(user)
        context.commit({ type: 'updateUser', user })
        return
      } else {
        console.log('store : ',currBusiness);
        var business = await BusinessService.update(currBusiness)
        context.commit({ type: 'setCurrBusiness', business: business })
        return
      }
    },
    async addAppoint(context , {appoint}) {
      var res = await AppointsService.add(appoint)
      context.dispatch({type:'loadAppoints',listRequire:'user'})
      return res
    },

    loadUserLocation(context){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
        var userLocation =  {lat : position.coords.latitude,lng:position.coords.longitude }
        context.commit({type:'setCurrUserLocation',userLocation})
        })
      } else {
        console.log(navigator.geolocation);
      }
      
    }
  }

})
