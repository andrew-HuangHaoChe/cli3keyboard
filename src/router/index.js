import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: process.env.NODE_ENV === 'production' ? '/cli3keyboard/' : '/',
  routes: [
    {
      path: '*',
      redirect: 'login'
    },
    {
      path: '/',
      name: '首頁',
      component: () => import('../views/FrontEnd/Homepage.vue')
    },
    {
      path: '/shopping',
      name: '購物頁',
      component: () => import('../views/FrontEnd/Home.vue')
    },
    {
      path: '/pickcommodity/:id?',
      name: '商品詳細頁',
      component: () => import('../views/FrontEnd/PickCommodity.vue')
    },
    {
      path: '/faOrder',
      name: '結帳頁面一',
      component: () => import('../views/FrontEnd/FdCustomerCheckout.vue')
    },
    {
      path: '/checkout2/:orderId',
      name: '確認結帳',
      component: () => import('../views/FrontEnd/CheckoutStep2.vue')
    },
    {
      path: '/promotion',
      name: 'promotion',
      component: () => import('../views/FrontEnd/Promotion.vue')
    },
    {
      path: '/login',
      name: '登入頁面',
      component: () => import('../views/BackEnd/Login.vue')
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: () => import('../views/BackEnd/Dashboard.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: 'products',
          name: 'Products',
          component: () => import('../views/BackEnd/Products.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'orderList',
          name: '訂單列表',
          component: () => import('../views/BackEnd/OrderList.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'Discount',
          name: '優惠券',
          component: () => import('../views/BackEnd/Discount.vue'),
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/Dashboard',
      name: '管理頁面',
      component: () => import('../views/BackEnd/Dashboard.vue'),
      children: [
        {
          path: '/mock',
          name: '模擬訂單',
          component: () => import('../views/BackEnd/Mockorder.vue')
        },
        {
          path: '/customer_checkout/:orderId',
          name: '結帳頁面',
          component: () => import('../views/BackEnd/CustomerCheckout.vue')
        }
      ]
    }
  ]
})
