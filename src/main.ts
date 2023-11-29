import { createApp } from 'vue'
import { createPinia } from 'pinia'

// impot các thư viện
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

// import css
import './css/main.css'

//import Api
import categoryApi from "./apis/categoryApi"

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.config.globalProperties.$_categoryApi = categoryApi;


app.mount('#app')
