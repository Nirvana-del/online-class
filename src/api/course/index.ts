import request from '@/utils/axios/request';

// 获取课程列表
export const getCourseList = (pagination:any) => {
    const { currentPage, pageSize } = pagination
    return request({
        method: 'get',
        url: `/course/findAll?page=${currentPage-1}&size=${pageSize}`
    })
}

// 获取所有课程的id和类型
export const getCourseIdType = () => {
    return request({
        method: 'get',
        url: `type/findAll`
    })
}

// 删除课程
export const deleteCourseItem = (courseId:any) => {
    return request({
        method: 'delete',
        url: `/course/delete`,
        params:{
            id:courseId
        }
    })
}

// 修改课程
export const updateCourseItem = (courseItem:any) => {
    const { id, name, type, coverUrl, period, teacher } = courseItem
    console.log(courseItem);
    
    // if(typeof(Number(teacher.id)) == number)
    return request({
        method: 'post',
        url: `/course/update`,
        data: {
            id,
            coverUrl,
            name,
            type:type.id,
            period,
            teacherId: teacher.id
        }
    })
}

// 新增课程
export const addCourseItem = (courseItem:any) => {
    const { name, type, coverUrl, period, teacher, introduction } = courseItem

    return request({
        method: 'post',
        url: `/course/add`,
        data: {
            coverUrl,
            name,
            type,
            period,
            teacher:teacher.id,
            introduction
        }
    })
}
