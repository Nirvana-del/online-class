// todo: 根据解耦的配置（如打包工具添加baseUrl或者devServer），可以切换请求的环境地址
// 封装参考：https://juejin.cn/post/6968630178163458084?share_token=7831c9e0-bea0-469e-8028-b587e13681a8#heading-27
// todo: 对重复请求处理，存储请求的cancelToken进队列。
// todo: 确认后请求响应格式，msg格式；异常的code码、响应格式。
// todo: 响应信息国际化
// todo: 请求工具是否要抽到公共packages中？

import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import requestInterceptor from './handlers/requestInterceptor'
import responseInterceptor from './handlers/responseInterceptor'
import errorHandler from './handlers/errorHandler'

function createAxios(axiosConfig: AxiosRequestConfig){
  const request = axios.create({
    // process.env.APP_API_BASE_URL, 在环境变量中可以配置不同请求地址
    baseURL: '/api',
    timeout: 10000,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })

  // todo： 分离
  // 请求拦截器
  request.interceptors.request.use(requestInterceptor, errorHandler)
  // 响应拦截器
  request.interceptors.response.use(responseInterceptor, errorHandler)

  return request(axiosConfig)
}

export default createAxios