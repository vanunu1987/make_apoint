import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './registerServiceWorker'
import VueDraggable from 'vue-draggable'
import resize from 'vue-resize-directive'
import moment from 'moment'
window.moment = moment
// main.js
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader


 
Vue.use(VueDraggable)
Vue.use(resize)

import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDMJmYLMFI-0rNvWoZ7KrGpryIsUXOivms',
    libraries: 'places', // This is required if you use the Autocomplete plugin
  },
})
import './styles.scss'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.use(ElementUI);

var VueScrollTo = require('vue-scrollto');
Vue.use(VueScrollTo,
{
  container: "body",
  duration: 1000,
  easing: "ease",
  offset: -10,
  force: true,
  cancelable: false,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
