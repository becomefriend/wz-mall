import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from "../views/Main";
import Article from "../views/Article";
import Hero from "../views/Hero";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children:[
              {path:'/', name:'home',component:Home},
              {path:'/articles/:id', name:'articles',component:Article,props:true},

    ]
  },
    {
path: '/heroes/:id',
      name: 'hero',
      component: Hero,
      props:true
    },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/Main.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
