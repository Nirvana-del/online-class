import request from '../request';

// 获取课程列表
export const getCourseList = (pagination) => {
    const { currentPage, pageSize } = pagination
    return request({
        method: 'get',
        url: `/course/findAll?page=${currentPage-1}&size=${pageSize}`
    })
}

// 删除课程
export const deleteCourseItem = (courseId) => {
    return request({
        method: 'delete',
        url: `/course/delete`,
        params:{
            id:courseId
        }
    })
}

// 修改课程
export const updateCourseItem = (courseItem) => {
    const { id, name, type, imageUrl, period, teacher } = courseItem
    return request({
        method: 'post',
        url: `/course/update`,
        data: {
            id,
            imageUrl,
            name,
            type,
            period,
            teacher: teacher.id
        }
    })
}

// 新增课程
export const addCourseItem = (courseItem) => {
    const { name, type, imageUrl, period, teacher } = courseItem

    return request({
        method: 'post',
        url: `/course/add`,
        data: {
            imageUrl,
            name,
            type,
            period,
            teacher:teacher.id
        }
    })
}
