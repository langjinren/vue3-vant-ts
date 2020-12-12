import { createApp } from 'vue'
import App from './App'
import router from './router'

import { loadAllPlugins } from "@/plugins"

const app: ReturnType<typeof createApp> = createApp(App)

loadAllPlugins(app)

import './plugins/resize.js'
import './styles/reset.css'

app
.use(router)
.mount("#app")
