import { createRouter, createWebHistory } from 'vue-router'
import SearchView from "@/views/SearchView";

const routes = [
  {
    path: '/',
    name: 'search',
    component: SearchView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
