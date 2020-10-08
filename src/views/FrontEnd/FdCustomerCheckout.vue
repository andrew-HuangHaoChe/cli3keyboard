<template>
  <div>
    <HomeNav class="pb-5"></HomeNav>
    <progressbar :status="status" class="my-5 pt-5"></progressbar>
    <div class="container">
      <section>
        <div class="row mt-3 d-flex justify-content-center">
          <div class="col-md-8">
            <p class="h3 text-primary text-center">購物清單</p>
              <div class="table-responsive py-2" v-if="cart.final_total!==0">
                <table class="table table-lg">
                  <thead>
                    <th class="border-0"></th>
                    <th class="text-center border-0">已選擇商品</th>
                    <th class="text-center border-0">品項</th>
                    <th class="text-center border-0">數量</th>
                    <th class="text-center border-0">價格</th>
                  </thead>
                  <tbody>
                    <tr v-for="commodity in cart.carts" :key="commodity.id">
                      <td width="20%"><button class="btn btn-outline-danger" @click="removeCartItem(commodity.id)"><i
                            class="far fa-trash-alt"></i></button></td>
                      <td width="20%" class="pb-0">
                        <img :src="commodity.product.imageUrl" class="img-fluid" style="max-width:80px;">{{ commodity.imageUrl }}
                      </td>
                      <td width="20%" class="align-middle text-center">
                        {{ commodity.product.title }}
                        <div class="text-success" v-if="commodity.coupon">
                          已套用優惠券
                        </div>
                      </td>
                      <td width="20%" class="text-center align-middle">
                        {{ commodity.qty }}
                        {{ commodity.product.unit }}
                      </td>
                      <td width="20%" class="text-right align-middle">{{ commodity.final_total | currency }}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="4" class="text-right">總計: </td>
                      <td class="text-right">{{ cart.total }}</td>
                    </tr>
                    <tr v-if="cart.final_total !== cart.total">
                      <td colspan="4" class="text-right text-success">折扣價:</td>
                      <td class="text-right text-success">{{ cart.final_total }}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            <div class="input-group mb-3 input-group-sm orderCoupon p-0">
                <input type="text" class="form-control incoupon" v-model="coupon_code" placeholder="請輸入優惠碼">
                <button class="btn btn-outline-secondary" type="button" @click="addCouponcode">
                  套用優惠碼
                </button>
            </div>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-md-12">
            <h1 class="text-primary h3 mb-4 text-center">訂單資訊</h1>
            <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form">
              <div class="my-2 row justify-content-center">
                <form class="col-md-8" @submit.prevent="newOrder">
                  <div class="form-group">
                    <label for="useremail">Email</label>
                    <ValidationProvider name="郵件" rules="required|email" v-slot="{ errors }">
                      <input type="email" class="form-control" name="email" id="useremail" v-model="form.user.email"
                        placeholder="請輸入 Email" required>
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="form-group">
                    <label for="username">收件人姓名</label>
                    <ValidationProvider name="姓名" rules="required" v-slot="{ errors }">
                      <input type="text" class="form-control" name="姓名" id="username" v-model="form.user.name"
                        placeholder="輸入姓名">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="form-group">
                    <label for="usertel">收件人電話</label>
                    <ValidationProvider name="電話" rules="required|phone:8" v-slot="{ errors }">
                      <input type="tel" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話" maxlength='10'>
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="form-group">
                    <label for="useraddress">收件人地址</label>
                    <ValidationProvider name="地址" rules="required" v-slot="{ errors }">
                      <input type="text" class="form-control" name="address" id="useraddress"
                        v-model="form.user.address" placeholder="請輸入地址">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                  <div class="form-group">
                    <label for="comment">留言</label>
                    <textarea name="" id="comment" class="form-control" cols="30" rows="10"
                      v-model="form.message"></textarea>
                  </div>
                  <div class="text-right">
                    <button class="btn btn-danger" :disabled="invalid">送出訂單</button>
                  </div>
                </form>
              </div>
            </ValidationObserver>
          </div>
        </div>
      </section>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import HomeNav from './HomeNavbar'
import Footer from './Footer'
import progressbar from './progressbar'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    HomeNav,
    Footer,
    progressbar
  },
  data () {
    return {
      coupon_code: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      orderId: '',
      order: {
        user: {}
      },
      status: 1
    }
  },
  methods: {
    newOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      const order = vm.form
      vm.$store.dispatch('updateLoading', true)
      vm.$http.post(api, { data: order }).then((response) => {
        if (response.data.success) {
          vm.$router.push(`/checkout2/${response.data.orderId}`)
        }
        vm.$store.dispatch('updateLoading', false)
      })
    },
    // removeCartItem (id) {
    //   const vm = this
    //   const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
    //   vm.$store.dispatch('updateLoading', true)
    //   vm.$http.delete(api).then((response) => {
    //     vm.getCart()
    //     vm.$store.dispatch('updateLoading', false)
    //   })
    // },
    addCouponcode () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const coupon = {
        code: vm.coupon_code
      }
      vm.$store.dispatch('updateLoading', true)
      vm.$http.post(api, { data: coupon }).then((response) => {
        vm.getCart()
        vm.$store.dispatch('updateLoading', false)
      })
    },
    ...mapActions('cartsModules', ['getCart', 'removeCartItem'])
  },
  computed: {
    ...mapGetters('cartsModules', ['cart'])
  },
  created () {
    const vm = this
    vm.getCart()
  }
}
</script>
