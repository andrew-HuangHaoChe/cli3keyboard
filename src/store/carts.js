import axios from 'axios'
export default {
  namespaced: true,
  state: {
    cart: {
      carts: []
    },
    status: {
      loadingItem: ''
    },
    mergeshopCart: false,
    totalQty: 0,
    itemId: ''
  },
  actions: {
    getCart (context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      context.commit('LOADING', true, { root: true })
      axios.get(api).then((response) => {
        context.commit('GET_CART', response.data.data)
        context.commit('LOADING', false, { root: true })
      })
    },
    addtoCart (context, { id, qty }) {
      context.dispatch('getCart')
      context.commit('MERGESHOPPCART', { id, qty })
      if (context.state.mergeshopCart) {
        const delAPI = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${context.state.itemId}`
        const addAPI = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
        const sameProduct = {
          product_id: id,
          qty: context.state.totalQty
        }
        axios.delete(delAPI).then(() => {
          return axios.post(addAPI, { data: sameProduct })
        }).then((item) => {
          if (item.data.success) {
            context.dispatch('getCart')
            context.dispatch('updateMessage', { message: item.data.message, status: 'success' }, { root: true })
          } else {
            context.dispatch('updateMessage', { message: item.data.message, status: 'danger' }, { root: true })
          }
        })
      } else {
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
        const noneSameproduct = {
          product_id: id,
          qty
        }
        axios.post(api, { data: noneSameproduct }).then((response) => {
          if (response.data.success) {
            context.dispatch('updateMessage', { message: response.data.message, status: 'success' }, { root: true })
          } else {
            context.dispatch('updateMessage', { message: response.data.message, status: 'danger' }, { root: true })
          }
          context.dispatch('getCart')
        })
      }
    },
    removeCartItem (context, id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      context.commit('CARTLOADING', id, { root: true })
      axios.delete(api).then((response) => {
        context.dispatch('getCart')
        context.commit('CARTLOADING', '', { root: true })
      })
    }
  },
  mutations: {
    GET_CART (state, payload) {
      state.cart = payload
    },
    SHOWCART (state, payload) {
      state.isshowCart = payload
    },
    MERGESHOPPCART (state, payload) {
      state.totalQty = 0
      state.itemId = ''
      state.mergeshopCart = false
      state.cart.carts.filter(function (item) {
        if (item.product_id === payload.id) {
          state.itemId = item.id
          state.mergeshopCart = true
          state.totalQty = payload.qty + item.qty
        }
      })
    }
  },
  getters: {
    cart (state) {
      return state.cart
    }
  }
}
