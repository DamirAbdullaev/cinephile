import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', name:'HomePage', component: HomePage
    },
    {
      path: '/search', name:'SearchPage', component: () => import('@/pages/SearchPage.vue')
    },
    {
      path: '/movie', name:'MoviePage', component: () => import('@/pages/MoviePage.vue')
    },
    {
      path: '/tv', name:'TvsPage', component: () => import('@/pages/TvsPage.vue')
    },
    {
      path: '/movie/:id', name:'MovieRecPage', component: () => import('@/pages/MovieRecPage.vue')
    },
    {
      path: '/tv/:id', name:'TvsRecPage', component: () => import('@/pages/TvsRecPage.vue')
    }
  ]
})

export default router
