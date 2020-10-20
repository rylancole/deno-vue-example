declare const Vue: any;

import router from "./router/index.ts";

import { Layout } from "./components/index.ts";

Vue.component("layout", Layout);

const app = new Vue({
  el: "#app",
  router,
});
