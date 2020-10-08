<template>
  <div>
    <SuccessMessage></SuccessMessage>
    <HomeNav></HomeNav>
    <router-view></router-view>
    <div class="container picContent pb-5">
      <div class="row pt-5">
        <div class="col-md-4">
          <div class="card border-0 picCard" v-for="item in product" :key="item.id">
            <div class="card-body">
              <h4 class="card-title d-inline">{{ item.title }}
                <span class="text-secondary h5">( {{ item.category }} )</span>
              </h4>
              <p class="card-text">
              <ul class="w-100 p-0 mb-0 mt-3 d-flex justify-content-between">
                <li class="d-inline h5 text-secondary d-flex align-items-center mb-0 priceLine">
                  {{ item.origin_price |currency }}</li>
                <li class="d-inline h3 text-primary mb-0">網路價 NT{{ item.price |currency }}</li>
              </ul>
              </p>
              <select name="" class="custom-select from-control mt-3 w-100" v-model="item.num">
                <option :value="num" v-for="num in 10" :key="num" selected>
                  選購{{ num }} {{ item.unit }}
                </option>
              </select>
            </div>
            <div class="card-footer d-flex justify-content-between bg-white">
              <div class="text-muted text-nowrap mr-3 d-inline">
                小計<strong>{{ item.num * item.price }}</strong>元
              </div>
              <button class="btn btn-primary d-inline" @click="addtoCart(item.id, item.num)">
                <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                加入購物車
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-8" v-for="item in product" :key="item.id">
          <div class="container px-3 imageBox">
            <div class="pdwrapper">
              <div class="img-box">
                  <img class="img-fluid" :src="item.imageUrl" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <ShopCart></ShopCart>
      <hr class="mt-5" style="border: 1px dashed #3d5958;">
    </div>
    <section class="container">
      <div class="row">
        <div class="col-md-12" v-for="pickItem in product" :key="pickItem.id">
          <h4 class="p-2 text-primary pickBorder"><i class="far fa-sticky-note pr-2"></i>商品規格</h4>
          <p class="h5" style="line-height: 36px;">
          <pre>{{ pickItem.description }}</pre>
          </p>
        </div>
        <div class="col-md-12" v-for="pickItem in product" :key="pickItem.category">
          <h4 class="p-2 text-primary pickBorder"><i class="far fa-star pr-2"></i>商品特點</h4>
          <p class="h5" style="line-height: 36px;">
          <pre>{{ pickItem.content }}</pre>
          </p>
        </div>
      </div>
    </section>
    <Footer></Footer>
  </div>
</template>
<script>
import HomeNav from './HomeNavbar'
import ShopCart from './ShopCart'
import Footer from './Footer'
import SuccessMessage from '../SuccessMessage'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    HomeNav,
    ShopCart,
    Footer,
    SuccessMessage
  },
  data () {
    return {
      product: [],
      isLoading: false,
      status: {
        loadingItem: ''
      },
      coupon_code: ''
    }
  },
  methods: {
    getProduct () {
      const vm = this
      const id = vm.$route.params.id
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      vm.$store.dispatch('updateLoading', true)
      vm.$http.get(api).then((response) => {
        response.data.product.num = 1
        vm.product.push(response.data.product)
        vm.$store.dispatch('updateLoading', false)
      })
    },
    addtoCart (id, qty) {
      this.$store.dispatch('cartsModules/addtoCart', { id, qty })
    },
    total () {
      const vm = this
      let totalNum = 0 // eslint-disable-line no-unused-vars
      for (const item in vm.cart) {
        if (vm.cart[item] === 'final_total') {
          totalNum += vm.cart[item]
        }
      }
    },
    ...mapActions(['getCart'])
  },
  computed: {
    ...mapGetters(['cart'])
  },
  created () {
    this.getProduct()
  },
  beforeMount () {
    this.getCart()
  }
}
</script>
