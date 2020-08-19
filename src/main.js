import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import VCharts from 'v-charts'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI, {locale})
Vue.use(VCharts)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})

// 全局拦截器,在进入需要用户权限的页面前校验是否已经登录
/*router.beforeResolve((to, from, next) => {
  const loginUser = store.state.user.name;
  //alert(store.state.user.name)
  // 判断路由是否设置相应校验用户权限
  if (to.meta.requireAuth) {
    if (loginUser == 'admin') {
      // 没有登录，显示登录组件
      // this.$router.push({path: '/memorandum/article-upload'})
      //此时，是在页面没有加载，直接在地址栏输入链接，进入需要登录验证的页面
      //this.$store.dispatch('LogOut')
      next("/login");
      return;
      // 终止导航
      next(false);
      return;
    }
  }
  next();
});*/
