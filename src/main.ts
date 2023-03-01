import { createApp } from 'vue'
import "./style.css"
import App from './App.vue'
//import './samples/node-api'
import 'uno.css'
import '@unocss/reset/antfu.css'



createApp(App)
  .mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
