import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/store';
import { GET_USERS } from '@/store/types/actions'
const Home = () => import(`@/views/Home.vue`);
const User = () => import(`@/views/User.vue`);
const NotFound = () => import(`@/views/NotFound.vue`);

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/:id",
    name: "User",
    component: User,
    async beforeEnter(to, from, next) {
      let exists = store.state.users.some(user => to.params.id === user.id);
      if (exists) next();
      else {
        await store.dispatch(GET_USERS);
        exists = store.state.users.find(user => to.params.id === user.id);
        if (exists) next();
        else next({name: 'NotFound'});
      }
    }
  },
  {
    path: '/404',
    alias: "*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
