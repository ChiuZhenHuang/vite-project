import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap-icons/font/bootstrap-icons.css';
// 導入 Bootstrap 的 CSS 文件
import 'bootstrap/dist/css/bootstrap.min.css';
// 導入 Bootstrap 的 JavaScript 文件，包括所有動態效果
import 'bootstrap';

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(VueAxios, axios)
app.mount('#app')
