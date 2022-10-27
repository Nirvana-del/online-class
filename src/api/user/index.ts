import request from '@/utils/axios/request';

// 获取用户列表
export const reqGetUserList = (pagination:any) => {
    const { currentPage, pageSize } = pagination
    return request({
        method: 'get',
        url: `user/findAll`,
        params: {
            page: currentPage - 1,
            size: pageSize
        }
    })
}