import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
import mainTextPlugin from "./plugins/texts";
import "./registerServiceWorker";

Vue.config.productionTip = false;
Vue.use(mainTextPlugin);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
