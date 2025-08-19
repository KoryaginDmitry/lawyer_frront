import {createApp} from "vue";
import App from "./App.vue";

import Oruga from "@oruga-ui/oruga-next";
import orugaConfig from "@/01-app/orugaConfig";

const app = createApp(App);

app.use(Oruga, orugaConfig);

app.mount("#app");