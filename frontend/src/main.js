import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@babel/polyfill";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import VueRouter from "vue-router";

import AnnotationComponent from "./components/AnnotationComponent";
import Home from "./components/Home";

Vue.config.productionTip = false;
Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/annotations",
      name: "annotations",
      component: AnnotationComponent
    }
  ]
});
new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount("#app");
