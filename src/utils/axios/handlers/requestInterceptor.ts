import type { AxiosRequestConfig } from 'axios'
// import { getDataFromSession } from '@/utils/storage'
function requestInterceptor(config: AxiosRequestConfig) {
  // const token = getDataFromSession('token')
  // if(token && typeof config.headers !== 'undefined'){
  //   config.headers.Authorization = token
  // }

  return config;
};

export default requestInterceptor;