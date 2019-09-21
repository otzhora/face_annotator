import Vue from "vue";
import App from "./App.vue";
import store from "./store/store";
import vuetify from "./plugins/vuetify";

import "@babel/polyfill";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
Vue.config.productionTip = false;

new Vue({
  vuetify,
  render: h => h(App),
  store
}).$mount("#app");
