import Vue from 'vue'
import Vuex from 'vuex'
import productsModules from './products'
import cartsModules from './carts'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    // cart: {
    //   carts: []
    // },
    status: {
      loadingItem: ''
    },
    // mergeshopCart: false,
    // totalQty: 0,
    // itemId: '',
    messages: []
  },
  actions: {
    updateLoading (context, status) {
      context.commit('LOADING', status)
    },
    updateMessage (context, { message, status }) {
      const timestamp = Math.floor(new Date() / 1000)
      context.commit('MESSAGEPUSH', { message, status, timestamp })
      context.dispatch('removeMessageWithTiming', timestamp)
    },
    removeMessage (context, num) {
      context.commit('REMOVE_MESSAGE', num)
    },
    removeMessageWithTiming (context, timestamp) {
      setTimeout(() => {
        context.commit('REMOVE_TIME', timestamp)
      }, 3000)
    },
    // getCart (context) {
    //   const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
    //   context.commit('LOADING', true, { root: true })
    //   axios.get(api).then((response) => {
    //     context.commit('GET_CART', response.data.data)
    //     context.commit('LOADING', false, { root: true })
    //   })
    // },
    // addtoCart (context, { id, qty }) {
    //   context.dispatch('getCart')
    //   context.commit('MERGESHOPPCART', { id, qty })
    //   if (context.state.mergeshopCart) {
    //     console.log(context.state.itemId)
    //     const delAPI = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${context.state.itemId}`
    //     const addAPI = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
    //     const sameProduct = {
    //       product_id: id,
    //       qty: context.state.totalQty
    //     }
    //     axios.delete(delAPI).then(() => {
    //       return axios.post(addAPI, { data: sameProduct })
    //     }).then((item) => {
    //       if (item.data.success) {
    //         context.dispatch('getCart')
    //         context.dispatch('updateMessage', { message: item.data.message, status: 'success' })
    //       } else {
    //         context.dispatch('updateMessage', { message: item.data.message, status: 'danger' })
    //       }
    //     })
    //   } else {
    //     const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
    //     const noneSameproduct = {
    //       product_id: id,
    //       qty
    //     }
    //     axios.post(api, { data: noneSameproduct }).then((response) => {
    //       if (response.data.success) {
    //         context.dispatch('updateMessage', { message: response.data.message, status: 'success' })
    //       } else {
    //         context.dispatch('updateMessage', { message: response.data.message, status: 'danger' })
    //       }
    //       context.dispatch('getCart')
    //     })
    //   }
    // },
    // removeCartItem (context, id) {
    //   const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
    //   context.commit('CARTLOADING', id)
    //   axios.delete(api).then((response) => {
    //     context.dispatch('getCart')
    //     context.commit('CARTLOADING', '')
    //   })
    // },
    // 後臺頁面
    uploadFile () {
    }
  },
  mutations: {
    LOADING (state, status) {
      state.isLoading = status
    },
    MESSAGEPUSH (state, { message, status, timestamp }) {
      state.messages.push({
        message,
        status,
        timestamp
      })
    },
    REMOVE_MESSAGE (state, num) {
      state.messages.splice(num, 1)
    },
    REMOVE_TIME (state, timestamp) {
      state.messages.forEach((item, i) => {
        if (item.timestamp === timestamp) {
          state.messages.splice(i, 1)
        }
      })
    },
    // GET_CART (state, payload) {
    //   state.cart = payload
    // },
    // SHOWCART (state, payload) {
    //   state.isshowCart = payload
    // },
    CARTLOADING (state, payload) {
      state.status.loadingItem = payload
    }
    // MERGESHOPPCART (state, payload) {
    //   state.totalQty = 0
    //   state.itemId = ''
    //   state.mergeshopCart = false
    //   state.cart.carts.filter(function (item) {
    //     if (item.product_id === payload.id) {
    //       state.itemId = item.id
    //       state.mergeshopCart = true
    //       state.totalQty = payload.qty + item.qty
    //     }
    //   })
    // }
  },
  getters: {
    isLoading (state) {
      return state.isLoading
    },
    loadingItem (state) {
      return state.status.loadingItem
    }
    // cart (state) {
    //   return state.cart
    // }
  },
  modules: {
    productsModules,
    cartsModules
  }
})
