import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "./assets/scss/style.scss"
import VueAwesomeSwiper from 'vue-awesome-swiper'
import './assets/iconfont/iconfont.css'
// require styles
import 'swiper/swiper-bundle.css'
import Card from "./components/Card";
import 'swiper/swiper-bundle.css'
import ListCard from "./components/ListCard";
import axios from 'axios'
Vue.component('m-list-card',ListCard)
Vue.component('m-card',Card)
Vue.use(VueAwesomeSwiper, /* { default global options } */)

Vue.config.productionTip = false
Vue.prototype.$http=axios.create({
  baseURL:'http://localhost:3000/web/api/'
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
