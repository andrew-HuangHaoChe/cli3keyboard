<template>
  <div>
    <HomeNav></HomeNav>
    <div class="hpHeader pt-5 pb-3">
      <div class="hpcontainer pt-3 pb-3">
          <div class="col-md-6">
            <div class="title-block text-white px-5" v-scrollanimation>
              <h1 class="h2 title">Are you ready to <strong>pamper your fingers</strong></h1>
              <p class="h5">豐富的回彈手感</p>
              <p class="h5 mb-5">帶給你完美的使用體驗</p>
              <router-link :to="'/pickcommodity/' + '-MEaFpDeTpmK4XUVTVjf'" class="fabuyNow"><span class="buyNow">BUY NOW<span class="pl-3">></span></span></router-link>
            </div>
          </div>
          <div class="col-md-6 d-flex">
            <div class="d-flex justify-content-center align-items-center">
              <img src="https://github.com/andrew-HuangHaoChe/image/blob/master/ducky-%E8%B1%AC%E5%B9%B4%E9%99%90%E5%AE%9A.png?raw=true" alt="" class="headerImg" v-scrollanimation>
            </div>
          </div>
      </div>
      <a href="#element" style="text-decoration: none;" v-smooth-scroll="{ duration: 200, offset:-150 }"><i
        class="fas fa-chevron-down text-white d-flex justify-content-center align-items-end"></i></a>
    </div>
    <section class="recommend py-5">
      <div class="container">
        <h3 class="d-flex justify-content-center pb-3 recommend-title" id="element">熱門產品</h3>
        <div class="row">
          <div class="col-md-4 my-4 box-shadow hpkeyboardCard" v-for="item in randomProduct" :key="item.id">
            <div class="card border-0">
              <router-link :to="'/pickcommodity/' + item.id" style="text-decoration:none;">
                <div
                  style="height: 160px; background-size: 80%; background-position: center; background-repeat: no-repeat; position: relative;"
                  :style="{ backgroundImage:`url(${item.imageUrl})`}">
                </div>
                <div class="card-body">
                  <span class="badge badge-secondary mb-2 cardCate">{{ item.category }}</span>
                  <h5 class="card-title mb-0">
                    <span class="text-dark">{{ item.title }}</span>
                  </h5>
                  <p class="card-text">{{ item.content }}</p>
                  <div class="d-flex justify-content-between align-items-baseline">
                    <div class="h5">{{ item.price }} 元</div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="hpMaincontent bg-secondary">
      <section class="hpcontent container bg-secondary">
        <div class="row">
          <div class="col-md-6">
            <div class="hpcontitleBox text-white" v-scrollanimation>
              <h2 class="h5">精湛做工</h2>
              <h3 class="h2">絕不放過每一個細節</h3>
              <p>成立於2020年</p>
            </div>
            <HomepageImg></HomepageImg>
          </div>
          <div class="col-md-6 d-flex">
            <div class="text-white hpMaindoc d-flex" v-scrollanimation>
              <div class="d-flex flex-column justify-content-start pt-2 pb-5">
                <p class="h5">
                  我們的團隊不斷精進及鑽研，只為將鍵盤的手感提升至極致
                  堅持選用耐磨，抗刮的鍵帽材質
                  良好的機板，大幅度減少故障的頻率
                  茫茫的鍵盤海中，終究有一把適合您的鍵盤
                  還在等甚麼呢?
                  趕緊去添購新鍵盤吧!
                </p>
                <router-link :to="{ path: '/shopping' }" class="noselect"><div class="bg"></div></router-link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <section class="py-5 bg-white">
      <div class="container">
        <div class="row d-flex justify-content-between">
          <div class="col-md-3 p-3 px-3 mx-2 bg-white ducky-block" v-scrollanimation>
            <router-link to="/shopping">
              <div class="d-flex justify-content-center hoverImg">
                <img src="https://github.com/andrew-HuangHaoChe/image/blob/master/ducky.jpg?raw=true">
              </div>
            </router-link>
            <p class="h4 text-center my-3">創傑</p>
            <p>屬於台灣的製造商，並於2008年創立，</p>
            <p>產品定位相當清晰明確，致力於開發高規格的機械式鍵盤</p>
            <p>品質在業內擁有相當高的口碑</p>
            <p>並且與全世界多達30個國家都有合作夥伴</p>
          </div>
          <div class="col-md-3 px-3 mx-2 bg-white" v-scrollanimation>
            <router-link to="/shopping">
              <div class="d-flex justify-content-center hoverImg">
                <img src="https://github.com/andrew-HuangHaoChe/image/blob/master/irock.jpg?raw=true">
              </div>
            </router-link>
            <p class="h4 text-center my-3">艾芮克</p>
            <p>艾芮克是台灣自有品牌，行銷全球的電腦周邊廠商</p>
            <p>成立以來產品不斷推陳出新</p>
            <p>資方亦不斷投注創新研發</p>
            <p>完善產品的附加價值，滿足使用者需求</p>
          </div>
          <div class="col-md-3 px-3 mx-2 bg-white" v-scrollanimation>
            <router-link to="/shopping">
              <div class="d-flex justify-content-center hoverImg">
                <img src="https://github.com/andrew-HuangHaoChe/image/blob/master/filco.png?raw=true">
              </div>
            </router-link>
            <p class="h4 text-center my-3">菲爾特</p>
            <p>創立於1982年</p>
            <p>近30年都專注於通信設備及計算機周邊設備研發和生產</p>
            <p>提供專業工坊</p>
            <p>讓許多使用者可以高度客製化自身鍵盤的外觀</p>
            <p>打造出心目中獨一無二的鍵盤</p>
          </div>
        </div>
      </div>
    </section>
    <div class="banner bg-dark">
      <div class="gammerWrapper">
        <div class="gammer" id="fir">
          <div class="gammerText">
            <h3 class="gammerTitle">針對您的雙手精心打造</h3>
            <p class="h5 gammerContent">將 Ducky One2 系列的精緻做工與豐富的產品線
              搭配PBT雙色鍵帽，鍵帽上的字符由雷射雕刻而成。
              鍵線分離的設計，採用最新的USB-Type-C，正反插
              拔都方便，更可以選擇自己喜愛的線材，讓DIY的空間
              沒有極限；地平線點綴配色，呈現詩意的意境，可以
              選擇其他鍵帽組合搭配，讓絢麗的色彩塗抹在你的鍵盤上
            </p>
          </div>
        </div>
        <div class="gammer" id="sec">
          <img class="clearfix" src="https://github.com/andrew-HuangHaoChe/image/blob/master/gamer2.png?raw=true"
            alt="">
        </div>
      </div>
    </div>
    <div class="parallax">
      <div class="container">
        <div class="newsletter">
            <span class="d-flex justify-content-center letter-title">Join us to get the latest news</span>
            <div class="px-3">
              <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form">
                <form @submit.prevent="emailSubmit">
                  <ValidationProvider name="郵件" rules="required|email" v-slot="{ errors }">
                    <input type="email" class="form-control" name="email" placeholder="請輸入Email" v-model="emailResult" required>
                    <span class="text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                  <button class="btn btn-primary mt-1 Sub" :disabled="invalid">Subscribe Now</button>
                </form>
              </ValidationObserver>
            </div>
          </div>
      </div>
    </div>
    <Footer class="mt-0"></Footer>
    <SuccessMessage></SuccessMessage>
  </div>
</template>
<script>
import HomeNav from './HomeNavbar'
import HomepageImg from './HomepageImg'
import SuccessMessage from '../SuccessMessage'
import Footer from './Footer'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    HomeNav,
    HomepageImg,
    Footer,
    SuccessMessage
  },
  data () {
    return {
      emailResult: null
    }
  },
  methods: {
    emailSubmit () {
      const vm = this
      vm.emailResult = ''
      vm.$store.dispatch('updateMessage', { message: '訂閱成功!', status: 'success' })
    },
    ...mapActions('productsModules', ['getProducts'])
  },
  computed: {
    randomProduct () {
      const vm = this
      if (vm.mainProducts.length === 0) {
        return
      }
      function randomList (x) {
        return Math.floor(Math.random() * x)
      }
      let recommendObjList = []
      let n = 0
      const temp = []
      n = randomList(vm.mainProducts.length)
      for (let i = 0; i < 3; i += 1) {
        n = randomList(vm.mainProducts.length)
        temp.push(n)
      }
      // eslint-disable-next-line
      const result = temp.filter((item, index, ary) => {
        return ary.indexOf(item) === index
      })
      if (result.length < 3) {
        const num = result[1]
        const addnum = num + 1
        if (result[0] !== addnum || result[1] !== addnum) {
          result.push(addnum)
        }
      }
      recommendObjList = [
        vm.mainProducts[result[0]],
        vm.mainProducts[result[1]],
        vm.mainProducts[result[2]]
      ]
      return recommendObjList
    },
    ...mapGetters('productsModules', ['mainProducts'])
  },
  created () {
    const vm = this
    vm.getProducts()
  }
}
</script>
