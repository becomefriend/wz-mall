import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
import './common/style.css'
Vue.config.productionTip = false

const http=axios.create({
  baseURL:'http://localhost:3000/admin/api'
})
// vue数据拦截器
http.interceptors.request.use(config=>{
if(localStorage.token){
  config.headers.Authorization='Bearer '+localStorage.token
  return config
}

},error => {
 return Promise.reject(error)
})
// vue登录拦截器
http.interceptors.response.use(res=>{
return res
},err => {
  if(err.response.data.message){
    Vue.prototype.$message({
      type:'error',
      message:err.response.data.message
    })
    console.log( err.response.status)
    if(err.response.status===401 || err.response.status===500){
         router.push('/login')
    }
  }
  console.log(err)

  return Promise.reject(err)
})

Vue.prototype.$http=http
// 解决不能上传文件的bug
Vue.mixin({
  computed:{
    uploadUrl(){
      return this.$http.defaults.baseURL+'/upload'
    }
  },
  methods:{
    getAuthHeaders(){
      return{
        Authorization:`Bearer ${localStorage.token || ''}`
      }
    }
  }
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
