import { App } from 'vue'
import focus from './focus'

const install = function (app: App<Element>) {
  app.directive('focus', focus)
}

export default install