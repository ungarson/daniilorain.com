import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import prototypes from "@/assets/prototype.js";

prototypes();
const app = createApp(App)

app.use(router)

app.mount('#app')
