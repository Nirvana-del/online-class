import request from '@/utils/axios/request';

// 获取课程列表
export const getCourseList = (pagination:any,sort:any) => {
    let params = {}
    if(pagination !== undefined){
        const { currentPage, pageSize } = pagination
         params = {
            page: currentPage-1,
            size: pageSize,
            sort
        }
    }else{
         params = {}
    }
   
    return request({
        method: 'get',
        url: `/course/findAll`,
        params
    })
}

// 根据课程关键字查找课程列表
export const getCourseListByKeyWord = (pagination:any,keyWord:any) => {
    console.log(keyWord);
    
    let params = {}
    if(pagination !== undefined){
        const { currentPage, pageSize } = pagination
         params = {
            page: currentPage-1,
            size: pageSize,
            name: keyWord
        }
    }else{
         params = {}
    }
   
    return request({
        method: 'get',
        url: `/course/findAll`,
        params
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
    const { id, name, type, coverUrl, period, teacher, introduction, view } = courseItem
    
    return request({
        method: 'post',
        url: `/course/update`,
        data: {
            id,
            coverUrl,
            name,
            type:type.id,
            period,
            teacher: teacher.id,
            introduction,
            view
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
