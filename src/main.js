import Vue from "vue";
import App from "./App.vue";
import apolloProvider from "./vue-apollo";
import DetailedArticle from "../src/components/DetailedArticle.vue";
import Container from "../src/components/Container.vue";
import VueRouter from "vue-router";

Vue.config.productionTip = false;
Vue.use(VueRouter);

const routes = [
  { path: "/", name: "home", component: Container },
  { path: "/article", name: "article", component: DetailedArticle },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

new Vue({
  apolloProvider,
  router,
  render: (createElement) => createElement(App),
}).$mount("#app");
