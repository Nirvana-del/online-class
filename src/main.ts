import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

import router from './router'


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const API: any = require('@/api/index.ts')

app.config.globalProperties.$API = API;

app.use(store).use(router).use(ElementPlus).mount('#app')
