<template>
  <div>
    <div class="btn-group dropup cartIcon">
      <button type="button" class="btn btn-primary dropdown-toggle btn-style" data-toggle="dropdown"
        data-display="static" aria-haspopup="true" aria-expanded="false">
        <i class="fas fa-shopping-basket"></i>
        <div class="quantity"><span class="d-flex align-items-center qtext justify-content-center">{{ Cartnum }}</span>
        </div>
      </button>
      <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-right shopCartmenu" data-stopPropagation="true">
        <div class="table-responsive cartstyle p-2">
          <table class="table table-sm">
            <thead v-if="isshowCart">
              <th class="border-0">已選擇商品</th>
              <th class="border-0"></th>
              <th class="text-center border-0"></th>
              <th class="text-center border-0"></th>
            </thead>
            <tbody>
              <tr v-if="isshowCart == false">
                <td colspan="3" class="text-danger text-center py-3">購物車是空的喔!</td>
              </tr>
              <tr v-for="commodity in cart.carts" :key="commodity.id">
                <td v-if="isshowCart">
                  <button class="btn btn-outline-danger" @click="removeCartItem(commodity.id)">
                    <i class="far fa-trash-alt" v-if="status.loadingItem !== commodity.id"></i>
                    <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === commodity.id"></i>
                  </button>
                </td>
                <td v-if="isshowCart">
                  {{ commodity.product.title }}
                  <div class="text-success" v-if="commodity.coupon">
                    已套用優惠券
                  </div>
                </td>
                <td class="text-center" v-if="isshowCart">{{ commodity.qty }} {{ commodity.product.unit }}</td>
                <td class="text-right" v-if="isshowCart">{{ commodity.total | currency }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-right" v-if="isshowCart">總計: </td>
                <td class="text-right" v-if="isshowCart">{{ cart.total }}</td>
              </tr>
              <tr v-if="cart.final_total !== cart.total">
                <td colspan="3" class="text-right text-success">折扣價:</td>
                <td class="text-right text-success">{{ cart.final_total }}</td>
              </tr>
            </tfoot>
          </table>
          <router-link :to="{ path: '/faOrder' }" class="btn btn-outline-primary w-100" v-if="isshowCart">結帳去
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
$('body').on('click', '[data-stopPropagation]', function (e) {
  e.stopPropagation()
})
export default {
  data () {
    return {
      isClick: true,
      isshowCart: false,
      cart: {},
      Cartnum: '',
      status: {
        loadingItem: ''
      }
    }
  },
  methods: {
    getCart () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.$store.dispatch('updateLoading', true)
      vm.$http.get(api).then((response) => {
        vm.cart = response.data.data
        vm.Cartnum = response.data.data.carts.length
        if (vm.cart.carts.length === 0) {
          vm.isshowCart = false
        } else {
          vm.isshowCart = true
        }
        vm.$store.dispatch('updateLoading', false)
      })
    },
    removeCartItem (id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      vm.status.loadingItem = id
      vm.$http.delete(api).then((response) => {
        vm.status.loadingItem = ''
        vm.getCart()
        vm.isLoading = false
      })
    },
    addCouponcode () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const coupon = {
        code: vm.coupon_code
      }
      vm.isLoading = true
      vm.$http.post(api, { data: coupon }).then((response) => {
        vm.getCart()
        vm.isLoading = false
      })
    },
    getCartNum (cartNum, car) {
      this.Cartnum = cartNum
      this.cart = car
    },
    updateCart (productId, cartId, newQty) {
      const vm = this
      const delAPI = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${cartId}`
      const addAPI = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const newCart = {
        product_id: productId,
        qty: newQty
      }
      vm.$store.dispatch('updateLoading', true)
      vm.$http.all([
        vm.$http.delete(delAPI),
        vm.$http.post(addAPI, { data: newCart })]).then(vm.$http.spread(() => {
        vm.$store.dispatch('updateLoading', false)
        vm.getCart()
      }))
    },
    addCart (id, qty) {
      const vm = this
      if (vm.isClick) {
        vm.isClick = false
        const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
        vm.$http.get(api).then((response) => {
          vm.cart = response.data.data
          const target = vm.cart.carts.filter((item) => item.product_id === id)// 過濾ajax回來的購物車資料，若是裡面的資料等於eventbus過來的資料相符(相同商品)就挑出來
          if (target.length > 0) { // 有一樣的商品時開始進行合併資料
            const sameshopCartItem = target[0]
            const originQty = sameshopCartItem.qty
            const newQty = originQty + qty// 舊有的商品數量與新的商品數量相加
            const productId = sameshopCartItem.product_id // 新的商品id
            const cartId = sameshopCartItem.id// 舊有商品的id
            vm.updateCart(productId, cartId, newQty)// 丟這三個參數去新的function
          } else { // 沒有一樣的商品時就直接加入購物車
            const cart = {
              product_id: id,
              qty
            }
            this.$http.post(api, { data: cart }).then(() => {
              vm.getCart()
            })
          }
          setTimeout(() => {
            vm.isClick = true
          }, 500)
        })
      }
    }
  },
  mounted () {
    const vm = this
    vm.$bus.$on('addtoShopcart2', (id, qty) => {
      vm.addCart(id, qty)
    })
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
