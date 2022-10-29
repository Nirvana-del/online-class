import request from '@/utils/axios/request';

// 获取用户列表
export const reqGetUserList = (pagination:any) => {
    let params = {}
    if(pagination !== undefined){
        const { currentPage, pageSize } = pagination
         params = {
            page: currentPage-1,
            size: pageSize
        }
    }else{
         params = {}
    }
    return request({
        method: 'get',
        url: `user/findAll`,
        params
    })
}

// 根据关键词获取用户列表
export const reqGetUserListByKeyWord = (pagination:any,keyWord:any) => {
    let params = {}
    if(pagination !== undefined){
        const { currentPage, pageSize } = pagination
         params = {
            page: currentPage-1,
            size: pageSize,
            name:keyWord
        }
    }else{
         params = {}
    }
    return request({
        method: 'get',
        url: `user/findAll`,
        params
    })
}

// 添加用户
export const reqAddUser = (user:any) => {
   const { avatarUrl, email, gender, nickName, phone, grades } = user
    return request({
        method: 'post',
        url: `user/add`,
        data:{
            avatarUrl, 
            email, 
            gender, 
            nickName, 
            phone,
            grades
        }
    })
}

// 修改用户
export const reqUpdateUser = (user:any) => {
   const { id, avatarUrl, email, gender, nickName, phone, grades } = user
    return request({
        method: 'post',
        url: `user/update`,
        data:{
            id,
            avatarUrl, 
            email, 
            gender, 
            nickName, 
            phone,
            grades
        }
    })
}

// 删除用户
export const reqDeleteUser = (userId:any) => {
    return request({
        method: 'delete',
        url: `user/delete?id=${userId}`,
    })
}