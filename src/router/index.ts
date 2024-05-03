import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path:'/login',
      component: () => import('../views/Login.vue')
    },
    {
      path:'/dashboard',
      component: () => import('../views/DashBoard.vue'),
      children:[
        {
          path:'productcomponent',
          component:() => import('../views/ProductComponent.vue')
        }
      ]
    },
    {
      path:'/user',
      component: () => import('../views/UserBoard.vue'),
      children:[
        {
          path:'shopping',
          component: () => import('../views/Shopping.vue')
        },
        {
          path:'product/:product',
          component: () => import('../views/UserProduct.vue')
        },
      ]
    }
  ]
})

export default router

