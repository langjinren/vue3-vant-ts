import axios from 'axios'
import { Toast } from "vant";

// create an axios instance
// @ts-ignore
const service = axios.create({
  baseURL: process.env.VUE_APP_URL_BASE
})

// request interceptor
service.interceptors.request.use(
  (config: any) => {
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: any) => {
    return response.data
  },
  (error: any) => {
    return {
      error_info: '网络未连接,请检查网络后重试'
    }
  }
)

export default service
