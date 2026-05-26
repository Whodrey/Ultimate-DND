import { createApp } from "vue";

// Vuetify
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import vuetify from "./plugins/vuetify";

import App from "./App.vue";
import router from "./router";

// Pinia
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.use(vuetify);
app.use(pinia);
app.use(router);

app.mount("#app");
