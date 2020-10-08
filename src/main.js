import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'bootstrap'
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize
} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import { email } from 'vee-validate/dist/rules'
import TW from 'vee-validate/dist/locale/zh_TW.json'
import VueI18n from 'vue-i18n'
import App from './App.vue'
import router from './router'
import './bus'
import currencyFilter from './filters/currency'
import dateFilter from './filters/date'
import vueSmoothScroll from 'vue2-smooth-scroll'
import ScrollAnimation from './directives/scrollanimation.js'
import store from './store'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
axios.defaults.withCredentials = true

Vue.component('Loading', Loading)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
localize('zh_TW', TW)
Vue.filter('currency', currencyFilter)
Vue.filter('date', dateFilter)
Vue.use(vueSmoothScroll)
Vue.use(VueI18n)
Vue.directive('scrollanimation', ScrollAnimation)

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})

const i18n = new VueI18n({
  locale: 'zhTW'
})

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then((response) => {
      if (response.data.success) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    })
  } else {
    next()
  }
})

extend('email', {
  ...email,
  message: '郵件地址不正確'
})
extend('phone', {
  validate (value, args) {
    return value.length >= args.length
  },
  params: ['length'],
  message: '電話長度不足'
})
extend('sure', value => {
  if (value >= 0) {
    return true
  }
  return '確定不使用優惠碼嗎?'
})
