<template>
  <div>
    <Loading :active.sync="isLoading"></Loading>
    <div class="wrapper">
      <div class="container">
        <div class="row mt-2">
          <div class="col-md-3">
            <div class="list-group sticky-top mb-3">
              <a href="#all" class="list-group-item list-group-item-action" :class="{ active: filter === 'all' }"
                @click.prevent="filter='all'">
                <i aria-hidden="true" class="far fa-keyboard mr-2"></i>全部鍵盤
              </a>
              <a href="#ducky" class="list-group-item list-group-item-action option-font" data-toggle="list"
                :class="{ active: filter === 'ducky'}" @click.prevent="filter ='ducky'">
                <i aria-hidden="true" class="far fa-keyboard mr-2"></i>Ducky
              </a>
              <a href="#irock" class="list-group-item list-group-item-action option-font" data-toggle="list"
                :class="{ active: filter === 'irock'}" @click.prevent="filter = 'irock'">
                <i aria-hidden="true" class="far fa-keyboard mr-2"></i>irock
              </a>
              <a href="#filco" class="list-group-item list-group-item-action option-font" data-toggle="list"
                :class="{ active: filter === 'filco'}" @click.prevent="filter = 'filco'">
                <i aria-hidden="true" class="far fa-keyboard mr-2"></i>filco
              </a>
            </div>
          </div>
          <div class="col-md-9">
            <div class="row">
                <div class="col-md-4 mb-4 box-shadow keyboardCard" v-for="item in filterProducts" :key="item.id">
                    <div class="card border-0">
                      <router-link :to="'/pickcommodity/' + item.id" style="text-decoration:none;">
                        <div
                          style="height: 180px;background-size: contain; background-position: center; background-repeat: no-repeat; position: relative;"
                          :style="{ backgroundImage:`url(${item.imageUrl})`}">
                        </div>
                        <div class="liked">
                          <a href="#" @click.prevent="removeLove(item)" v-if="changeLove(item)">
                            <i class="fas fa-heart text-primary d-flex justify-content-end"></i>
                          </a>
                          <a href="#" @click.prevent="addFav(item)" v-else>
                            <i class="far fa-heart text-primary d-flex justify-content-end"></i>
                          </a>
                        </div>
                        <div class="card-body">
                          <span class="badge badge-secondary mb-2 cardCate">{{ item.category }}</span>
                          <h5 class="card-title mb-0">
                            <span class="text-dark">{{ item.title }}</span>
                          </h5>
                          <p class="card-text">{{ item.content }}</p>
                          <div class="d-flex justify-content-between align-items-baseline">
                            <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
                            <del class="h6">原價 {{ item.origin_price }} 元</del>
                            <div class="h5">現在只要 {{ item.price }} 元</div>
                          </div>
                        </div>
                      </router-link>
                      <div class="card-footer bg-white d-flex">
                        <router-link :to="'/pickcommodity/' + item.id">
                          <button type="button" class="btn btn-outline-secondary btn-sm" @click="getProduct(item.id)">
                             <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                            查看更多</button>
                        </router-link>
                        <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addtoCart(item.id, item.numItem)">
                          <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                          加到購物車
                        </button>
                      </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <ShopCart></ShopCart>
      </div>
    </div>
    <Footer></Footer>
    <SuccessMessage></SuccessMessage>
  </div>
</template>
<script>
import ShopCart from './ShopCart'
import Footer from './Footer'
import SuccessMessage from '../SuccessMessage'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    ShopCart,
    Footer,
    SuccessMessage
  },
  data () {
    return {
      shopcart: [],
      product: {},
      status: {
        loadingItem: ''
      },
      isActive: true,
      filter: 'ducky',
      favorite: []
    }
  },
  methods: {
    addtoCart (id, qty = 1) {
      this.$store.dispatch('cartsModules/addtoCart', { id, qty })
    },
    // 取得最愛列表
    getFavList () {
      const vm = this
      vm.favorite = JSON.parse(localStorage.getItem('favlistinStorage')) || []
      vm.$bus.$emit('favorite', vm.favorite)
    },
    // 加入最愛
    addFav (item) {
      const vm = this
      if (!vm.favorite.includes(item)) {
        vm.favorite.push(item)
      }
      localStorage.setItem('favlistinStorage', JSON.stringify(vm.favorite))
    },
    // 標誌變換
    changeLove (item) {
      const vm = this
      return vm.favorite.some(element => {
        const res = item.id === element.id
        return res
      })
    },
    // 刪除最愛
    removeLove (removeItem) {
      const vm = this
      // 重新定位要刪除的 index
      vm.favorite.forEach(function (item, key) {
        if (removeItem.id === item.id) {
          vm.sliceIndex = key
        }
      })
      vm.favorite.splice(vm.sliceIndex, 1)
      localStorage.setItem('favlistinStorage', JSON.stringify(vm.favorite))
    },
    ...mapActions(['updateLoading', 'updateMessage', 'removeMessage', 'removeMessageWithTiming']),
    ...mapActions('productsModules', ['getProducts'])
  },
  computed: {
    filterProducts () {
      const filter = this.filter
      if (filter === 'all') {
        return this.mainProducts // 要改成mainProduct
      } else if (filter === 'ducky') {
        return this.mainProducts.filter(function (item, index, array) {
          return item.category === 'Ducky'
        })
      } else if (filter === 'irock') {
        return this.mainProducts.filter(function (item, index, array) {
          return item.category === 'i-rock'
        })
      } else if (filter === 'filco') {
        return this.mainProducts.filter(function (item, index, array) {
          return item.category === 'Filco'
        })
      }
      return true
    },
    ...mapGetters('productsModules', ['mainProducts', 'singleProduct']),
    ...mapGetters(['isLoading', 'loadingItem'])
  },
  mounted () {
    const vm = this
    vm.$bus.$on('feebackFav', (id) => {
      vm.getProducts()
    })
  },
  created () {
    this.getProducts()
    this.getFavList()
  }
}
</script>
