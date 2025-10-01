import {createApp} from "vue";
import App from "./App.vue";
import Oruga from "@oruga-ui/oruga-next";
import orugaConfig from "@/01-app/orugaConfig";
import router from "@/01-app/router";
import { createPinia } from 'pinia'
import piniaPersist from "pinia-plugin-persistedstate";

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPersist);

app.use(Oruga, orugaConfig);
app.use(router);
app.use(pinia);

app.mount("#app");