function errorHandler(error:any) {
  console.log(error);
  
  if (error.response) {
    // 统一处理状态码 403、500这类的
    switch (error.response.status) {
    default:
      // status 为401，当前用户在其他地方登录时，只有data.detail
      // 新建用户，若status 400时，没有detail，有data.message
      error.message = error.response.data.detail || error.response.data.message || '请求错误'
    }
  } else {
    // 返回无返回体时(如请求超时),补全数据格式
    // todo: 无返回体时可能有多种请求，应分别给出不同的处理
    error.message = '请求错误'
  }
  return Promise.reject(error)
}

export default errorHandler;