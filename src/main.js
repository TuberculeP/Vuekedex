import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import UserDeck from "@/components/UserDeck";

const app = createApp(App)
app.use(store)
app.use(router)
app.component('UserDeck', UserDeck)
app.mount('#app')
