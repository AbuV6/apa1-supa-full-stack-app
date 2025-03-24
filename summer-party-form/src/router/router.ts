import Home from "../views/Home.vue";
import GuestDetails from "../components/GuestDetails.vue";
import { createMemoryHistory, createRouter } from "vue-router";
import GuestList from "../views/GuestList.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/guest/:id", component: GuestDetails, props: true },
  { path: "/guests", component: GuestList },
];

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
