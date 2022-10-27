import type { AxiosRequestConfig, AxiosResponse } from 'axios'
// import codeMap from '../responseCode'

function responseInterceptor(config: AxiosResponse) {
  // 当请求code为200，但是返回体response.data.code为异常值时，在此处做异常处理并抛出错误
  // const responseCode = config.data.code
  // if (responseCode) {
  //   switch (responseCode) {
  //   // login
  //   case codeMap.login.adminLoginInfoErr:
  //   case codeMap.login.userLoginInfoErr:
  //     // todo: 为error定义一个错误类型，有type和message属性
  //     throw {
  //       type: 'warning',
  //       message: config.data.message
  //     }
  //   }
  // }
  return config
}

export default responseInterceptor
