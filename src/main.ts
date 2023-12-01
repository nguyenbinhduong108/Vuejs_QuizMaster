import { createApp } from 'vue'
import { createPinia } from 'pinia'

// impot các thư viện
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

// import css
import './css/main.css'

const app = createApp(App)

app.use(createPinia()).use(router).use(vuetify).mount('#app');
