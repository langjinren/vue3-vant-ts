import { createApp } from "vue"
const app: ReturnType<typeof createApp> = createApp(App)

declare global {
  declare interface Window {
    WeixinJSBridge: any;
    BLightApp: any;
    AlipayJSBridge: any;
  }
}
