<template>
  <div>
    <div class="btn-group dropup cartIcon">
      <button type="button" class="btn btn-primary dropdown-toggle btn-style" data-toggle="dropdown"
        data-display="static" aria-haspopup="true" aria-expanded="false">
        <i class="fas fa-shopping-basket"></i>
        <div class="quantity"><span class="d-flex align-items-center qtext justify-content-center" v-if="cart.carts.length !== 0">{{ cart.carts.length }}</span>
        </div>
      </button>
      <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-right shopCartmenu" data-stopPropagation="true">
        <div class="table-responsive cartstyle p-2">
            <table class="table table-sm">
              <thead v-if="cart.total !==0">
                <th class="border-0" colspan="2">已選擇商品</th>
                <th class="text-center border-0"></th>
                <th class="text-center border-0"></th>
              </thead>
              <tbody>
                <tr v-if="cart.total == 0">
                  <td colspan="4" class="text-danger text-center py-2 border-0">購物車是空的喔!</td>
                </tr>
                <tr v-for="commodity in cart.carts" :key="commodity.id">
                  <td class="p-2" v-if="cart.total !==0">
                    <button class="btn btn-outline-danger" @click="removeCartItem(commodity.id)">
                      <i class="far fa-trash-alt" v-if="loadingItem !== commodity.id"></i>
                      <i class="fas fa-spinner fa-spin" v-if="loadingItem === commodity.id"></i>
                    </button>
                  </td>
                  <td class="p-3" v-if="cart.total !==0">
                    {{ commodity.product.title }}
                    <div class="text-success" v-if="commodity.coupon">
                      已套用優惠券
                    </div>
                  </td>
                  <td class="text-center p-3" v-if="cart.total !==0">{{ commodity.qty }} {{ commodity.product.unit }}</td>
                  <td class="text-right p-3" style="padding-right: 0 !important;" v-if="cart.total !==0">{{ commodity.total | currency }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr v-if="cart.total !==0">
                  <td colspan="3" class="text-right">總計: </td>
                  <td class="text-right">{{ cart.total }}</td>
                </tr>
                <tr v-if="cart.final_total !== cart.total">
                  <td colspan="3" class="text-right text-success">折扣價:</td>
                  <td class="text-right text-success">{{ cart.final_total }}</td>
                </tr>
              </tfoot>
            </table>
            <router-link :to="{ path: '/faOrder' }" class="btn btn-outline-primary w-100" v-if="cart.total !==0">結帳去</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import { mapGetters, mapActions } from 'vuex'
$('body').on('click', '[data-stopPropagation]', function (e) {
  e.stopPropagation()
})
export default {
  data () {
    return {
      isClick: true,
      Cartnum: ''
    }
  },
  methods: {
    // getCart () {
    //   this.$store.dispatch('getCart')
    // },
    addCouponcode () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const coupon = {
        code: vm.coupon_code
      }
      vm.$store.dispatch('updateLoading', true)
      vm.$http.post(api, { data: coupon }).then((response) => {
        vm.$store.dispatch('cartsModules/getCart')
        vm.$store.dispatch('updateLoading', false)
      })
    },
    getCartNum (cartNum, car) {
      this.Cartnum = cartNum
      this.cart = car
    },
    // updateCart (productId, cartId, newQty) {
    //   const vm = this
    //   const delAPI = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${cartId}`
    //   const addAPI = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
    //   const newCart = {
    //     product_id: productId,
    //     qty: newQty
    //   }
    //   vm.$store.dispatch('updateLoading', true)
    //   vm.$http.all([
    //     vm.$http.delete(delAPI),
    //     vm.$http.post(addAPI, { data: newCart })]).then(vm.$http.spread(() => {
    //     vm.$store.dispatch('updateLoading', false)
    //     vm.getCart()
    //   }))
    // },
    ...mapActions('cartsModules', ['getCart', 'addtoCart', 'removeCartItem'])
  },
  computed: {
    // cart () {
    //   return this.$store.state.cart
    // },
    loadingItem () {
      return this.$store.state.status.loadingItem
    },
    ...mapGetters('cartsModules', ['cart'])
  },
  created () {
    const vm = this
    vm.$bus.$on('cartnum', (cartNum, car) => {
      vm.getCartNum(cartNum, car)
    })
    vm.getCart()
  }
}
</script>
