import { createApp } from "vue";
import Auth from "./views/Auth.vue";
import "./registerServiceWorker";
import store from "./store";

createApp(Auth).use(store).mount("#app");
