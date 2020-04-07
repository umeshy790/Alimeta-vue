import Vue from "vue";
import App from "./App.vue";
import apolloProvider from "./vue-apollo";
// import VueRouter from "vue-router";

Vue.config.productionTip = false;
// Vue.use(VueRouter);

// const routes = [{ path: "/", component: App }];

// const router = new VueRouter({
//   mode: "history",
//   routes
// });

new Vue({
  apolloProvider,
  render: createElement => createElement(App)
}).$mount("#app");
