import request from '@/utils/axios/request';

// 获取教师列表
export const getTeacherList = (pagination:any) => {
    const { currentPage, pageSize } = pagination
    return request({
        method: 'get',
        url: `teacher/findAll`,
        params: {
            page: currentPage - 1,
            size: pageSize
        }
    })
}
// 获取所有教师的id和姓名
export const getTeacherIdName = () => {
    return request({
        method: 'get',
        url: `teacher/findIdName`
    })
}
//添加教师
export const addTeacherItem = (teacherInfo:any) => {
    const { id, email, phone, teacherName, introduce } = teacherInfo
    return request({
        method: 'post',
        url: `teacher/add`,
        data: {
            teacherName,
            phone,
            email,
            introduce
        }
    })
}
//更新教师信息
export const updateCourseItem = (teacherInfo:any) => {
    const { id, email, phone, teacherName, introduce } = teacherInfo
    return request({
        method: 'post',
        url: `teacher/add`,
        data: {
            id,
            teacherName,
            phone,
            email,
            introduce
        }
    })
}

//删除教师
export const deleteTeacherItem = (id:any) => {
    return request({
        method: 'delete',
        url: `teacher/delete`,
        params: {
            id
        }
    })
}