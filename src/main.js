import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from '../router/index'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import vueNumeralFilterInstaller from 'vue-numeral-filter';
import store from '../store'
import Vuex from 'vuex'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

import VueHtmlToPaper from 'vue-html-to-paper';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

///////// fontAwesome //////////////////////////////

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false

library.add(faSpinner)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(vueNumeralFilterInstaller, { locale: 'en-gb' });
Vue.use(Vuex)
Vue.use(VueToast);

Vue.use(VueHtmlToPaper);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app',
    router
)
