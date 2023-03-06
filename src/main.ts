import { createApp } from 'vue'
import "./style.css"
import App from './App.vue'
//import './samples/node-api'
import 'uno.css'
import 'element-plus/dist/index.css'
import '@unocss/reset/tailwind.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

createApp(App)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
