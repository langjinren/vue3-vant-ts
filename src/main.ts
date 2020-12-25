import { createApp } from 'vue'
import App from './App'
import router from './router'
import directive from './directive'

import './plugins/resize.js'
import './styles/reset.css'

import { loadAllPlugins } from "@/plugins"

const app: ReturnType<typeof createApp> = createApp(App)

loadAllPlugins(app)

app
.use(directive)
.use(router)
.mount("#app")
