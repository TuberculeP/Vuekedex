import { createRouter, createWebHistory } from 'vue-router'
import SearchPokemon from "@/components/SearchPokemon";

const routes = [
  {
    path: '/',
    name: 'searchpokemon',
    component: SearchPokemon
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
