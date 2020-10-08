import axios from 'axios'
export default {
  // state模組區域變數
  // actions, mutations, getters 是屬於全域變數
  namespaced: true, // 加上這句後 actions, mutations, getters 是屬於"區域"變數
  state: {
    products: [],
    product: [],
    categories: []
  },
  actions: {
    getProducts (context) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      context.commit('LOADING', true, { root: true })
      axios.get(api).then((response) => {
        context.commit('PRODUCTS', response.data.products)
        context.commit('LOADING', false, { root: true })
      })
    }
  },
  mutations: {
    PRODUCTS (state, payload) {
      state.products = payload
    },
    PRODUCT (state, payload) {
      state.product = payload
      state.product.num = 1
    }
  },
  getters: {
    mainProducts (state) {
      return state.products
    },
    singleProduct (state) {
      return state.product
    }
  }
}
