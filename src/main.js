import { createApp } from "vue";
import Home from "./views/Home.vue";
import "./registerServiceWorker";
import store from "./store";

createApp(Home).use(store).mount("#app");
