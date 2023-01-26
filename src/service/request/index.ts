/* eslint-disable @typescript-eslint/no-empty-interface */
import axios from 'axios'
import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import localeCache from '@/utile/cache'

interface IFourInterceptor<T = AxiosResponse> {
  requestSurres?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestErro?: (error: unknown) => unknown
  responseSurres?: (config: T) => T
  responseErro?: (error: unknown) => unknown
}

interface Iinterceptor<T = AxiosResponse> extends AxiosRequestConfig {
  interceptor?: IFourInterceptor
  showLodings?: boolean
}
// 如有拦截先后顺序的需求 只需要把所有实例拦截器 放在 单个实例拦截器上面
class HttpsRequsts {
  instance: AxiosInstance
  interceptor?: IFourInterceptor
  Loding?: LoadingInstance
  showLodings?: boolean
  constructor(config: Iinterceptor) {
    console.log(config)

    this.instance = axios.create(config)
    this.interceptor = config.interceptor as IFourInterceptor
    this.showLodings = config.showLodings ?? true
    // 单个实例私有拦截器
    this.instance.interceptors.request.use(
      this.interceptor?.requestSurres,
      this.interceptor?.requestErro
    )
    // 单个实例私有拦截器
    this.instance.interceptors.response.use(
      this.interceptor?.responseSurres,
      this.interceptor?.responseErro
    )
    // 所有实例全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 生成loding
        if (this.showLodings) {
          this.Loding = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }
        // 携带token
        const token = localeCache.getCache('token')??''
        if (token) {
          config.headers = {
            Authorization: `Bearer ${token}`
          }
        }

        return config
      },
      (error) => {
        return error
      }
    )
    this.instance.interceptors.response.use(
      (config) => {
        // 移除loding
        setTimeout(() => {
          this.Loding?.close()
        }, 1000)
        // 全局拦截 config.data
        return config.data
      },
      (error) => {
        this.Loding?.close()
        return error
      }
    )
  }
  // 每个单独的请求也有自己的拦截器
  request<T>(config: Iinterceptor<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptor?.requestSurres) {
        config = config.interceptor.requestSurres(config)
      }
      if (config.showLodings === false) {
        this.showLodings = config.showLodings
      }
      this.instance.request<any, any>(config).then((res) => {
        if (config.interceptor?.responseSurres) {
          res = config.interceptor.responseSurres(res)
        }
        this.showLodings = true
        resolve(res)
      })
    })
  }
  get<T>(config: Iinterceptor): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }
  post<T>(config: Iinterceptor): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }
  delete<T>(config: Iinterceptor): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }
  patch<T>(config: Iinterceptor): Promise<T> {
    return this.request({ ...config, method: 'PATCH' })
  }
}
export default HttpsRequsts
