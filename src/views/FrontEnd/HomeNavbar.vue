<template>
  <div>
    <SuccessMessage></SuccessMessage>
    <nav class="navbar navbar-expand-lg navbar-light fixed-top topnav">
      <div class="container">
        <button class="navbar-toggler showMenu" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <router-link to="/"><img src="https://github.com/andrew-HuangHaoChe/image/blob/master/keyboardlogo.png?raw=true"
            class="logoImg"></router-link>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto py-1 home-nav-icon align-items-start">
            <li class="nav-item pr-4 d-flex justify-content-start">
              <router-link :to="{ path: '/'}" active-class="routerActive"><i
                  class="fas fa-home fa-2x d-flex justify-content-center"></i>
                <div class="d-flex justify-content-center homeFont">首頁</div>
              </router-link>
            </li>
            <li class="nav-item pr-4 d-flex justify-content-start">
              <router-link :to="{ path: '/shopping'}" active-class="routerActive"><i
                  class="fas fa-shopping-bag fa-2x d-flex justify-content-center"></i>
                <div class="d-flex justify-content-center homeFont">商品</div>
              </router-link>
            </li>
            <li class="nav-item pr-4 d-flex justify-content-start">
              <router-link :to="{ path: '/promotion'}" active-class="routerActive"><i
                  class="fas fa-ticket-alt fa-2x d-flex justify-content-center"></i>
                <div class="d-flex justify-content-center icon">優惠</div>
              </router-link>
            </li>
            <li class="nav-item pr-4 d-flex justify-content-start">
              <router-link :to="{ path: '/login'}" active-class="routerActive"><i
                  class="far fa-user fa-2x d-flex justify-content-center"></i>
                <div class="d-flex justify-content-center icon">登入</div>
              </router-link>
            </li>
            <li class="nav-item pr-4 d-flex justify-content-start">
              <div class="btn-group">
                <div class="btn-group dropleft favIcon" role="group">
                  <button type="button"
                    class="d-flex flex-column align-items-start p-0 border-0 btn dropdown-toggle dropdown-toggle-split favBtn"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-heartbeat heartIcon"></i>
                    <div class="homeFont">最愛</div>
                  </button>
                  <div class="dropdown-menu favorite-dropdown-menu">
                    <div class="row drop-item-f px-4 py-1 favoriteList" v-for="item in navbarFavorite" :key="item.id">
                      <div class="col-8 drop-item pl-1">{{ item.title }}</div>
                      <div class="col-1 drop-item"><i class="fas fa-shopping-cart" @click="addtoCart(item.id)"></i></div>
                    </div>
                  </div>
                  <p class="favLength" v-if="navbarFavorite.length !== 0"><span class="d-flex justify-content-center">{{ navbarFavorite.length }}</span></p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import SuccessMessage from '../SuccessMessage'
export default {
  components: {
    SuccessMessage
  },
  data () {
    return {
      isrouActive: false,
      navbarFavorite: [],
      favList: []
    }
  },
  methods: {
    addtoCart (id, qty = 1, item) {
      const vm = this
      vm.$store.dispatch('cartsModules/addtoCart', { id, qty })
      vm.navbarFavorite.forEach(function (item, key) {
        if (id === item.id) {
          vm.sliceIndex = key
        }
      })
      vm.navbarFavorite.splice(vm.sliceIndex, 1)
      localStorage.setItem('favlistinStorage', JSON.stringify(this.navbarFavorite))
    },
    getFavtitle () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      vm.$http.get(api).then((response) => {
        const productItem = response.data.products
        productItem.filter((item) => {
          if (vm.navbarFavorite.indexOf(item.id) !== -1) {
            vm.favList.push(item.title)
          }
          return item
        })
      })
    }
  },
  mounted () {
    this.getFavtitle()
  },
  created () {
    const vm = this
    vm.$bus.$on('favorite', (newfavorite) => {
      vm.navbarFavorite = newfavorite
    })
  }
}
</script>
<style lang="scss" scoped>
  .topnav {
    background-color: #fafafa;
    box-shadow: 0 0 6px 0 gray;
  }
</style>
