import request from '@/utils/axios/request';

// 根据课程类型查找课程列表
export const getCourseListByType = (type:any) => {
    const { typeId } = type
    return request({
        method: 'get',
        url: `/type/find`,
        params:{
            id:typeId
        }
    })
}

// 查找课程类型列表
export const getCourseTypeList = () => {
    return request({
        method: 'get',
        url: `/type/findAll`
    })
}