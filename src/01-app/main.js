import {createApp} from "vue";
import App from "./App.vue";
import Oruga from "@oruga-ui/oruga-next";
import orugaConfig from "@/01-app/orugaConfig";
import router from "@/01-app/router";

const app = createApp(App);

app.use(Oruga, orugaConfig);
app.use(router);

app.mount("#app");