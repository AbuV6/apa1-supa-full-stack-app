import Home from '../views/Home.vue'
import GuestDetails from '../components/GuestDetails.vue'
import { createMemoryHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/', component: Home },
  { path: '/guest/:id', component: GuestDetails },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
