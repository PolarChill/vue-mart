import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import store from './store';

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/cart',
      name: 'cart',
      //元数据信息
      meta: {
        auth:true
      },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Cart.vue')
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    // 需要认证 检查令牌
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.path}
      })
    }
  } else {
    next()
  }
})
export default router