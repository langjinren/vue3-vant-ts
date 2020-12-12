import {
  Field ,
  Button,
  Loading
} from "vant"
import { createApp } from "vue"
import 'vant/lib/field/style/less'
import 'vant/lib/button/style/less'

/**
 * @description 手动注册组件,达到按需加载目的
 * @description Automatically register components under Button, such as Button.Group
 * @param {ReturnType<typeof createApp>} app 整个应用的实例
 * @returns void
 */
export default function loadComponent(app: ReturnType<typeof createApp>) {
  app.use(Field)
  app.use(Button)
  app.use(Loading)
}