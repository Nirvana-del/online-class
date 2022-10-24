import request from '../request';
// 获取教师列表
export const getTeacherList = (pagination) => {
    const { currentPage, pageSize } = pagination
    return request({
        method: 'get',
        url: `teacher/findAll?page=${currentPage - 1}&size=${pageSize}`
    })
}
//添加教师
export const addTeacherItem = (teacherInfo) => {
    const { id, email, level, password, phone, teacherName, username } = teacherInfo
    return request({
        method: 'post',
        url: `teacher/add`,
        data: {
            username,
            password,
            teacherName,
            phone,
            email,
            level
        }
    })
}
//更新教师信息
export const updateCourseItem = (teacherInfo) => {
    const { id, email, level, password, phone, teacherName, username } = teacherInfo
    return request({
        method: 'post',
        url: `teacher/add`,
        data: {
            id,
            username,
            password,
            teacherName,
            phone,
            email,
            level
        }
    })
}

//删除教师
export const deleteTeacherItem = (id) => {
    return request({
        method: 'delete',
        url: `teacher/delete`,
        params: {
            id
        }
    })
}